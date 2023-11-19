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

// func (s *service) GetUsers(ctx context.Context, query *FilterUserParams) ([]*UserResult, error){

// 	return nil, nil
// }

func (s *service) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	user, err := s.userRepo.GetItemByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("cannot get user: %v", err)
	}

	return user, nil
}

func (s *service) GetUserByID(ctx context.Context, id string) (*User, error) {
	user, err := s.userRepo.GetItemByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("cannot get user by Id  %v", err)
	}

	return user, nil
}

func (s *service) DeleteUserFromDynamoDB(ctx context.Context, userId string) error {
	err := s.userRepo.DeleteItemByID(ctx, userId)
	if err != nil {
		return fmt.Errorf("cannot delete user from DynamoDB: %v", err)
	}

	return nil
}

func (s *service) DeleteUserFromCognito(ctx context.Context, userID string) error {
	err := s.userRepo.DeleteItemByID(ctx, userID)
	if err != nil {
		return fmt.Errorf("cannot delete user from Cognito: %v", err)
	}

	return nil
}

func (s *service) UpdateUser(ctx context.Context, user *User) error {
	err := s.userRepo.UpdateUserProfile(ctx, user)
	if err != nil {
		return fmt.Errorf("cannot update user profile: %v", err)
	}
	return nil
}

func (s *service) UpdateUserRole(ctx context.Context, user *User) error {
	err := s.userRepo.UpdateUserRole(ctx, user)
	if err != nil {
		return err
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

func (s *service) ChangePasswordFromCognito(ctx context.Context, user *ChangePassword) error {
	err := s.userRepo.UpdatePasswordFromCognito(ctx, user)
	if err != nil {
		return err
	}
	return nil
}

func (s *service) ChangePasswordFromDynamoDB(ctx context.Context, user *User) error {
	err := s.userRepo.UpdatePasswordFromDynamoDb(ctx, user)
	if err != nil {
		return err
	}
	return nil
}
