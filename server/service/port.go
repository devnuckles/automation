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
	RefreshToken(ctx context.Context, refreshToken string) (*cognitoidentityprovider.InitiateAuthOutput, error)
	Logout(ctx context.Context, accessToken string) error

	// Mail Service
	SendMail(ctx context.Context, emailTo []string, subject, emailBody string) error

	// S3 Service
	UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetFiles(ctx context.Context, prefix string) ([]*S3Object, error)
	DeleteFile(ctx context.Context, id string) error
	DeleteFiles(ctx context.Context, prefix string) ([]*S3Object, error)

	// User Service
	GetUser(ctx context.Context, accessToken string) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	GetUserByID(ctx context.Context, id string) (*User, error)
	ChangePasswordFromCognito(ctx context.Context, user *User) error
	ChangePasswordFromDynamoDB(ctx context.Context, user *User) error
	DeleteUserFromDynamoDB(ctx context.Context, userId string) error
	DeleteUserFromCognito(ctx context.Context, userID string) error
	LogoutUser(ctx context.Context, accessToken string) error
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
	GetItem(ctx context.Context, accessToken string) (*User, error)
	GetItemByEmail(ctx context.Context, email string) (*User, error)
	GetItemByID(ctx context.Context, id string) (*User, error)
	DeleteItemByID(ctx context.Context, id string) error
<<<<<<< HEAD
	RefreshToken(ctx context.Context, refreshToken string) (*cognitoidentityprovider.InitiateAuthOutput, error)
	Logout(ctx context.Context, accessToken string) error
=======
	UpdatePasswordFromCognito(ctx context.Context, user *User) error
	UpdatePasswordFromDynamoDb(ctx context.Context, user *User) error 
	Logout(ctx context.Context, accessToken string) (*cognitoidentityprovider.GlobalSignOutOutput, error)
>>>>>>> eec6f76 (Added Change Password API)
}

type FileRepo interface {
	Upload(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetList(ctx context.Context, prefix string) ([]*S3Object, error)
	Delete(ctx context.Context, id string) error
}
