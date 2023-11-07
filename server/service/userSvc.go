package service

import (
	"context"
	"crypto/rand"
	"fmt"
	"math/big"
)

const otpChars = "0123456789"

var otpCache = make(map[string]string)

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

func (s *service) GetUsers(ctx context.Context, params *FilterUserParams) (*UserResult, error) {
	if len(params.Role) > 0 {
		result, err := s.userRepo.GetItemsByRole(ctx, params.Role, params.Pivot, params.Limit)
		if err != nil {
			return nil, err
		}

		return result, nil
	}

	result, err := s.userRepo.GetItems(ctx, params.Pivot, params.Limit)
	if err != nil {
		return nil, err
	}

	return result, nil
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

func (s *service) GetOTP(ctx context.Context, email string) string {
	otp := generateOTP()
	otpCache[email] = otp
	return otp
}

func generateOTP() string {
	otpLength := 6

	otp := make([]byte, otpLength)
	for i := range otp {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(otpChars))))
		otp[i] = otpChars[num.Int64()]
	}

	return string(otp)
}
