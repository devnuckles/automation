package repo

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/schemetech-developer/automation/service"
)

const flowUsernamePassword = "USER_PASSWORD_AUTH"

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

func (r *userRepo) Logout(ctx context.Context, accessToken string) (*cognitoidentityprovider.GlobalSignOutOutput, error) {
	input := &cognitoidentityprovider.GlobalSignOutInput{
		AccessToken: aws.String(accessToken),
	}

	res, err := r.svc.GlobalSignOutWithContext(ctx, input)

	return res, err
}
