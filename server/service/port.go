package service

import (
	"context"
	"time"

	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
)

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	CreateUser(ctx context.Context, user *User) error
	LoginUser(ctx context.Context, user *User) (*cognitoidentityprovider.InitiateAuthOutput, error)
}

type ErrorRepo interface {
	GetError(ctx context.Context, internalCode string) (*ErrorDetail, error)
}

type Cache interface {
	Set(key string, value string, ttl time.Duration) error
	Get(key string) (string, error)
	Delete(key string) error
	GetTTL(key string) (time.Duration, error)
}

type UserRepo interface {
	Create(ctx context.Context, user *User) error
	Login(ctx context.Context, user *User) (*cognitoidentityprovider.InitiateAuthOutput, error)
}
