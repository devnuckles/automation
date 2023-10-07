package repo

import (
	"context"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/schemetech-developer/automation/service"
)

const flowUsernamePassword = "USER_PASSWORD_AUTH"

type UserRepo interface {
	service.UserRepo
}

type userRepo struct {
	svc         *cognitoidentityprovider.CognitoIdentityProvider
	appClientID string
}

func NewUserRepo(svc *cognitoidentityprovider.CognitoIdentityProvider, appClientID string) UserRepo {
	return &userRepo{
		svc:         svc,
		appClientID: appClientID,
	}
}

func (r *userRepo) Create(ctx context.Context, user *service.User) error {
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

	input := &cognitoidentityprovider.SignUpInput{
		ClientId:       aws.String(r.appClientID),
		Password:       aws.String(user.Password),
		Username:       aws.String(user.Email),
		UserAttributes: userAttributes,
	}

	_, err := r.svc.SignUpWithContext(ctx, input)
	return err
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
