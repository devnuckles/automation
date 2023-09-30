package service

import (
	"context"
)

func (s *service) CreateUser(ctx context.Context, user *User) error {
	err := s.userRepo.Create(ctx, user)
	if err != nil {
		return err
	}

	return nil
}
