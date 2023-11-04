package service

import (
	"context"

	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
)

func (s *service) CreateUser(ctx context.Context, user *User) error {
	err := s.userRepo.Create(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (s *service) LoginUser(ctx context.Context, user *User) (*cognitoidentityprovider.InitiateAuthOutput, error) {
	res, err := s.userRepo.Login(ctx, user)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *service) RefreshToken(ctx context.Context, refreshToken string) (*cognitoidentityprovider.InitiateAuthOutput, error) {
	res, err := s.userRepo.RefreshToken(ctx, refreshToken)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *service) Logout(ctx context.Context, accessToken string) error {
	_, err := s.userRepo.Logout(ctx, accessToken)
	if err != nil {
		return err
	}

	return nil
}
