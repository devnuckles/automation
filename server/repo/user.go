package repo

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/service"
)

const (
	flowUsernamePassword = "USER_PASSWORD_AUTH"
	flowRefreshToken     = "REFRESH_TOKEN_AUTH"
	userIdxIndex         = "IdxIndex"
	userRoleIndex        = "RoleIndex"
)

type UserRepo interface {
	service.UserRepo
}

type userRepo struct {
	svc         *cognitoidentityprovider.CognitoIdentityProvider
	appClientID string
	db          *dynamodb.DynamoDB
	tableName   string
	userPoolId  string
}

func NewUserRepo(svc *cognitoidentityprovider.CognitoIdentityProvider, appClientID string, userPoolId string, db *dynamodb.DynamoDB, tableName string) UserRepo {
	return &userRepo{
		svc:         svc,
		appClientID: appClientID,
		db:          db,
		tableName:   tableName,
		userPoolId:  userPoolId,
	}
}

const (
	userEmailIndex = "EmailIndex"
)

func (r *userRepo) Create(ctx context.Context, user *service.User) error {
	// Create the user in Cognito
	userAttributes := []*cognitoidentityprovider.AttributeType{
		{
			Name:  aws.String("custom:role"),
			Value: aws.String(user.Role),
		},
		{
			Name:  aws.String("custom:status"),
			Value: aws.String(user.Status),
		},
		{
			Name:  aws.String("custom:createdBy"),
			Value: aws.String(user.CreatedBy),
		},
	}

	cognitoInput := &cognitoidentityprovider.SignUpInput{
		ClientId:       aws.String(r.appClientID),
		Password:       aws.String(user.Password),
		Username:       aws.String(user.Email),
		UserAttributes: userAttributes,
	}

	res, err := r.svc.SignUpWithContext(ctx, cognitoInput)
	if err != nil {
		return err
	}

	// Creating user to store in DynamoDB
	user.ID = *res.UserSub

	usr, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		return fmt.Errorf("cannot marshal report: %v", err)
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(r.tableName),
		Item:      usr,
	}

	_, err = r.db.PutItemWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return fmt.Errorf("failed to write item: %v - %v", aerr.Code(), aerr.Message())
		}

		return fmt.Errorf("failed to write item: %v", err)
	}

	return nil
}

func (r *userRepo) Login(ctx context.Context, user *service.User) (*cognitoidentityprovider.InitiateAuthOutput, error) {
	authParameters := map[string]*string{
		"USERNAME": aws.String(user.Email),
		"PASSWORD": aws.String(user.Password),
	}

	input := &cognitoidentityprovider.InitiateAuthInput{
		ClientId:       aws.String(r.appClientID),
		AuthParameters: authParameters,
		AuthFlow:       aws.String(flowUsernamePassword),
	}

	res, err := r.svc.InitiateAuthWithContext(ctx, input)

	return res, err
}

func (r *userRepo) GetItem(ctx context.Context, accessToken string) (*service.User, error) {
	input := &cognitoidentityprovider.GetUserInput{
		AccessToken: aws.String(accessToken),
	}
	res, err := r.svc.GetUserWithContext(ctx, input)

	if err != nil {
		return nil, err
	}

	user := getSvcUserFromAttributes(res.UserAttributes)

	return user, nil
}

func getSvcUserFromAttributes(userAttributes []*cognitoidentityprovider.AttributeType) *service.User {
	user := &service.User{}

	attrToField := map[string]*string{
		"sub":              &user.ID,
		"name":             &user.Username,
		"email":            &user.Email,
		"phone_number":     &user.PhoneNumber,
		"picture":          &user.Image,
		"custom:role":      &user.Role,
		"custom:status":    &user.Status,
		"custom:createdBy": &user.CreatedBy,
	}

	for _, attr := range userAttributes {
		if field, ok := attrToField[*attr.Name]; ok {
			*field = *attr.Value
		}
	}

	return user
}

func (r *userRepo) GetItemByEmail(ctx context.Context, email string) (*service.User, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(r.tableName),
		IndexName:              aws.String(userEmailIndex),
		KeyConditionExpression: aws.String("Email = :email"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":email": {
				S: aws.String(email),
			},
		},
	}

	result, err := r.db.QueryWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, fmt.Errorf("failed to get item: %v - %v", aerr.Code(), aerr.Message())
		}
		return nil, fmt.Errorf("failed to get item: %v", err)
	}

	if len(result.Items) == 0 {
		return nil, nil
	}

	var user *service.User
	err = dynamodbattribute.UnmarshalMap(result.Items[0], &user)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal DynamoDB item: %v", err)
	}

	return user, nil
}

func (r *userRepo) GetItemByID(ctx context.Context, id string) (*service.User, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(id),
			},
		},
	}

	result, err := r.db.GetItemWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, fmt.Errorf("failed to get item: %v - %v", aerr.Code(), aerr.Message())
		}
		return nil, fmt.Errorf("failed to get item: %v", err)
	}

	if result.Item == nil {
		return nil, nil
	}

	var user *service.User
	err = dynamodbattribute.UnmarshalMap(result.Item, &user)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal DynamoDB item: %v", err)
	}

	return user, nil
}

func (r *userRepo) GetItems(ctx context.Context, pivot string, limit int64) (*service.UserResult, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(r.tableName),
		IndexName:              aws.String(userIdxIndex),
		KeyConditionExpression: aws.String("Idx = :idx"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":idx": {
				S: aws.String("1"),
			},
		},
		Limit:            aws.Int64(limit),
		ScanIndexForward: aws.Bool(false),
	}

	if len(pivot) > 0 {
		lastEvaluatedKey, err := r.retrieveDefaultLastEvaluatedKey(pivot)
		if err != nil {
			return nil, fmt.Errorf("cannot break next page: %v", err)
		}

		input.ExclusiveStartKey = lastEvaluatedKey
	}

	result, err := r.db.QueryWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, fmt.Errorf("failed to get item: %v - %v", aerr.Code(), aerr.Message())
		}
		return nil, fmt.Errorf("failed to get item: %v", err)
	}

	var users []*service.User
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &users)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal DynamoDB item: %v", err)
	}

	nextPivot, err := r.formatDefaultLastEvaluatedKey(result.LastEvaluatedKey)
	if err != nil {
		logger.Error(ctx, "Error in making next pivot", err)
	}

	userResult := &service.UserResult{
		NextPivot: nextPivot,
		Users:     users,
	}

	return userResult, nil
}

func (r *userRepo) GetItemsByRole(ctx context.Context, role, pivot string, limit int64) (*service.UserResult, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(r.tableName),
		IndexName:              aws.String(userRoleIndex),
		KeyConditionExpression: aws.String("#role = :role"),
		ExpressionAttributeNames: map[string]*string{
			"#role": aws.String("Role"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":role": {
				S: aws.String(role),
			},
		},
		Limit:            aws.Int64(limit),
		ScanIndexForward: aws.Bool(false),
	}

	if len(pivot) > 0 {
		lastEvaluatedKey, err := r.retrieveLastEvaluatedKey(pivot)
		if err != nil {
			return nil, fmt.Errorf("cannot break next page: %v", err)
		}

		input.ExclusiveStartKey = lastEvaluatedKey
	}

	result, err := r.db.QueryWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, fmt.Errorf("failed to get item: %v - %v", aerr.Code(), aerr.Message())
		}
		return nil, fmt.Errorf("failed to get item: %v", err)
	}

	var users []*service.User
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &users)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal DynamoDB item: %v", err)
	}

	nextPivot, err := r.formatLastEvaluatedKey(result.LastEvaluatedKey)
	if err != nil {
		logger.Error(ctx, "Error in making next pivot", err)
	}

	userResult := &service.UserResult{
		NextPivot: nextPivot,
		Users:     users,
	}

	return userResult, nil
}

func (r *userRepo) DeleteItemByID(ctx context.Context, id string) error {
	u, err := r.GetItemByID(ctx, id)
	if err != nil {
		return err
	}

	if u == nil {
		return nil
	}

	cognitoInput := &cognitoidentityprovider.AdminDeleteUserInput{
		UserPoolId: aws.String(r.userPoolId),
		Username:   aws.String(id),
	}

	_, err = r.svc.AdminDeleteUserWithContext(ctx, cognitoInput)
	if err != nil {
		return err
	}

	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(u.ID),
			},
		},
	}

	_, err = r.db.DeleteItemWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return fmt.Errorf("failed to delete item: %v - %v", aerr.Code(), aerr.Message())
		}
		return fmt.Errorf("failed to delete item: %v", err)
	}

	return nil
}

func (r *userRepo) UpdateUserProfile(ctx context.Context, user *service.User) error {
	// Update user in Cognito
	cognitoInput := &cognitoidentityprovider.AdminUpdateUserAttributesInput{
		UserPoolId: aws.String(r.userPoolId),
		Username:   aws.String(user.Email),
		UserAttributes: []*cognitoidentityprovider.AttributeType{
			{
				Name:  aws.String("firstname"),
				Value: aws.String(user.Firstname),
			},
			{
				Name:  aws.String("lastname"),
				Value: aws.String(user.Lastname),
			},
			{
				Name:  aws.String("email"),
				Value: aws.String(user.Email),
			},
			{
				Name:  aws.String("custom:profile_picture"),
				Value: aws.String(user.Image),
			},
		},
	}

	_, err := r.svc.AdminUpdateUserAttributesWithContext(ctx, cognitoInput)
	if err != nil {
		return fmt.Errorf("failed to update user profile in Cognito: %v", err)
	}

	// Update user in DynamoDB
	item, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		return fmt.Errorf("failed to marshal user to DynamoDB map: %v", err)
	}

	dynamoInput := &dynamodb.PutItemInput{
		TableName: aws.String(r.tableName),
		Item:      item,
	}

	_, err = r.db.PutItemWithContext(ctx, dynamoInput)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return fmt.Errorf("failed to put item in DynamoDB: %v - %v", aerr.Code(), aerr.Message())
		}
		return fmt.Errorf("failed to put item in DynamoDB: %v", err)
	}

	return nil
}

func (r *userRepo) UpdateUserRole(ctx context.Context, user *service.User) error {
	u, err := r.GetItemByID(ctx, user.ID)
	if err != nil {
		return err
	}

	if u == nil {
		return nil
	}

	// Update role in Cognito
	cognitoInput := &cognitoidentityprovider.AdminUpdateUserAttributesInput{
		UserPoolId: aws.String(r.userPoolId),
		Username:   aws.String(user.Email),
		UserAttributes: []*cognitoidentityprovider.AttributeType{
			{
				Name:  aws.String("custom:role"),
				Value: aws.String(user.Role),
			},
		},
	}

	_, err = r.svc.AdminUpdateUserAttributesWithContext(ctx, cognitoInput)
	if err != nil {
		return fmt.Errorf("failed to update user role in Cognito: %v", err)
	}

	// Update role in DynamoDB
	dynamoInput := &dynamodb.UpdateItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(user.ID),
			},
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":r": {
				S: aws.String(user.Role),
			},
		},
		UpdateExpression: aws.String("SET #r = :r"),
		ExpressionAttributeNames: map[string]*string{
			"#r": aws.String("Role"),
		},
	}

	_, err = r.db.UpdateItemWithContext(ctx, dynamoInput)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return fmt.Errorf("failed to update item: %v - %v", aerr.Code(), aerr.Message())
		}
		return fmt.Errorf("failed to update item: %v", err)
	}

	return nil
}

func (r *userRepo) Logout(ctx context.Context, accessToken string) (*cognitoidentityprovider.GlobalSignOutOutput, error) {
	input := &cognitoidentityprovider.GlobalSignOutInput{
		AccessToken: aws.String(accessToken),
	}

	res, err := r.svc.GlobalSignOutWithContext(ctx, input)

	return res, err
}

func (r *userRepo) RefreshToken(ctx context.Context, refrehToken string) (*cognitoidentityprovider.InitiateAuthOutput, error) {
	authParameters := map[string]*string{
		"REFRESH_TOKEN": aws.String(refrehToken),
	}

	input := &cognitoidentityprovider.InitiateAuthInput{
		ClientId:       aws.String(r.appClientID),
		AuthParameters: authParameters,
		AuthFlow:       aws.String(flowRefreshToken),
	}

	res, err := r.svc.InitiateAuth(input)

	return res, err
}

func (r *userRepo) UpdatePasswordFromCognito(ctx context.Context, user *service.ChangePassword) error {
	input := &cognitoidentityprovider.ChangePasswordInput{
		AccessToken:      aws.String(user.AccessToken),
		PreviousPassword: aws.String(user.OldPassword),
		ProposedPassword: aws.String(user.NewPassword),
	}

	_, err := r.svc.ChangePasswordWithContext(ctx, input)
	if err != nil {
		return err
	}

	return nil
}

func (r *userRepo) UpdatePasswordFromDynamoDb(ctx context.Context, user *service.User) error {
	// Create a DynamoDB update item input
	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(user.ID),
			},
		},
		UpdateExpression: aws.String("set #p = :p"),
		ExpressionAttributeNames: map[string]*string{
			"#p": aws.String("password"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":p": {
				S: aws.String(user.Password),
			},
		},
	}

	// Execute the update item operation
	_, err := r.db.UpdateItemWithContext(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to update password in DynamoDB: %v", err)
	}

	return nil
}

func (r *userRepo) ResetCognitoPassword(ctx context.Context, email string) error {
	cognitoInput := &cognitoidentityprovider.ForgotPasswordInput{
		ClientId: aws.String(r.appClientID),
		Username: aws.String(email),
	}

	_, err := r.svc.ForgotPasswordWithContext(ctx, cognitoInput)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return fmt.Errorf("failed to write item: %v - %v", aerr.Code(), aerr.Message())
		}

		return fmt.Errorf("failed to write item: %v", err)
	}

	return nil
}

func (r *userRepo) formatLastEvaluatedKey(lastEvaluatedKey map[string]*dynamodb.AttributeValue) (string, error) {
	if lastEvaluatedKey == nil {
		return "", errors.New("lastEvaluatedKey is nil")
	}

	createdByAttr, ok := lastEvaluatedKey["CreatedBy"]
	if !ok || createdByAttr.S == nil {
		return "", errors.New("missing or invalid InitiatorId attribute value")
	}
	createdBy := *createdByAttr.S

	createdAtAttr, ok := lastEvaluatedKey["CreatedAt"]
	if !ok || createdAtAttr.N == nil {
		return "", errors.New("missing or invalid CreatedAt attribute value")
	}
	createdAt := *createdAtAttr.N

	idAttr, ok := lastEvaluatedKey["Id"]
	if !ok || idAttr.S == nil {
		return "", errors.New("missing or invalid Id attribute value")
	}
	id := *idAttr.S

	nextPivot := strings.Join([]string{createdBy, createdAt, id}, "+")

	return nextPivot, nil
}

func (r *userRepo) retrieveLastEvaluatedKey(pivot string) (map[string]*dynamodb.AttributeValue, error) {
	parts := strings.Split(pivot, "+")
	if len(parts) != 3 {
		return nil, fmt.Errorf("invalid pivot")
	}

	createdBy, createdAt, id := parts[0], parts[1], parts[2]

	lastEvaluatedKey := map[string]*dynamodb.AttributeValue{
		"CreatedBy": {
			S: &createdBy,
		},
		"CreatedAt": {
			N: &createdAt,
		},
		"Id": {
			S: &id,
		},
	}

	return lastEvaluatedKey, nil
}

func (r *userRepo) formatDefaultLastEvaluatedKey(lastEvaluatedKey map[string]*dynamodb.AttributeValue) (string, error) {
	if lastEvaluatedKey == nil {
		return "", errors.New("lastEvaluatedKey is nil")
	}

	idxAttr, ok := lastEvaluatedKey["Idx"]
	if !ok || idxAttr.S == nil {
		return "", errors.New("missing or invalid InitiatorId attribute value")
	}
	idx := *idxAttr.S

	createdAtAttr, ok := lastEvaluatedKey["CreatedAt"]
	if !ok || createdAtAttr.N == nil {
		return "", errors.New("missing or invalid CreatedAt attribute value")
	}
	createdAt := *createdAtAttr.N

	idAttr, ok := lastEvaluatedKey["Id"]
	if !ok || idAttr.S == nil {
		return "", errors.New("missing or invalid Id attribute value")
	}
	id := *idAttr.S

	nextPivot := strings.Join([]string{idx, createdAt, id}, "+")

	return nextPivot, nil
}

func (r *userRepo) retrieveDefaultLastEvaluatedKey(pivot string) (map[string]*dynamodb.AttributeValue, error) {
	parts := strings.Split(pivot, "+")
	if len(parts) != 3 {
		return nil, fmt.Errorf("invalid pivot")
	}

	idx, createdAt, id := parts[0], parts[1], parts[2]

	lastEvaluatedKey := map[string]*dynamodb.AttributeValue{
		"Idx": {
			S: &idx,
		},
		"CreatedAt": {
			N: &createdAt,
		},
		"Id": {
			S: &id,
		},
	}

	return lastEvaluatedKey, nil
}

func (r *userRepo) retrieveDefaultLastEvaluatedKeyByOffset(offset int64) (map[string]*dynamodb.AttributeValue, error) {
	offsetKey := strconv.FormatInt(offset, 10)

	lastEvaluatedKey := map[string]*dynamodb.AttributeValue{
		"Idx": {
			S: aws.String("1"),
		},
		"CreatedAt": {
			N: aws.String(strconv.FormatInt(time.Now().Unix(), 10)),
		},
		"Id": {
			S: aws.String(uuid.New().String()),
		},
		"Offset": {
			N: aws.String(offsetKey),
		},
	}

	return lastEvaluatedKey, nil
}
