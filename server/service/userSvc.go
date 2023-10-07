package service

import "context"

func (s *service) GetUser(ctx context.Context, accessToken string) (*User, error) {
	user, err := s.userRepo.GetItem(ctx, accessToken)
	if err != nil {
		return nil, err
	}

	return user, nil
}
