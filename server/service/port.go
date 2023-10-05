package service

import (
	"context"
	"mime/multipart"
	"time"

	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
)

type Service interface {
	// General Service
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	// Auth Service
	CreateUser(ctx context.Context, user *User) error
	LoginUser(ctx context.Context, user *User) (*cognitoidentityprovider.InitiateAuthOutput, error)

	// Mail Service
	SendMail(ctx context.Context, emailTo []string, subject, emailBody string) error

	// S3 Service
	UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetFiles(ctx context.Context, prefix string) ([]*S3Object, error)
	DeleteFile(ctx context.Context, id string) error
	DeleteFiles(ctx context.Context, prefix string) ([]*S3Object, error)
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

type FileRepo interface {
	Upload(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetList(ctx context.Context, prefix string) ([]*S3Object, error)
	Delete(ctx context.Context, id string) error
}
