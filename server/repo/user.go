package repo

import (
	"context"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/schemetech-developer/automation/service"
)

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
	input := &cognitoidentityprovider.SignUpInput{
		ClientId: aws.String(r.appClientID),
		Password: aws.String(user.Password),
		Username: aws.String(user.Email),
	}

	_, err := r.svc.SignUp(input)
	return err
}
