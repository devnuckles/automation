package service

import (
	"context"
	"fmt"
)

func (s *service) GetUser(ctx context.Context, accessToken string) (*User, error) {
	user, err := s.userRepo.GetItem(ctx, accessToken)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *service) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	user, err := s.userRepo.GetItemByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("cannot get user: %v", err)
	}

	return user, nil
}

func (s *service) DeleteUser(ctx context.Context, id string) error {
	err := s.userRepo.DeleteItemByID(ctx, id)
	if err != nil {
		return err
	}

	return nil
}

func (s *service) DeleteUserFromDynamoDB(ctx context.Context, id string) error {
	err := s.userRepo.DeleteItemByID(ctx, id)
	if err != nil {
		return fmt.Errorf("cannot delete user from DynamoDB: %v", err)
	}

	return nil
}

func (s *service) DeleteUserFromCognito(ctx context.Context, userID string) error {
	err := s.userRepo.DeleteItemByID(ctx, userID)
	if err != nil {
		return fmt.Errorf("cannot delte user from Cognito: %v", err)
	}

	return nil
}

func (s *service) LogoutUser(ctx context.Context, accessToken string) error {
	_, err := s.userRepo.Logout(ctx, accessToken)
	if err != nil {
		return err
	}

	return nil
}
