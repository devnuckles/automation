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
	InitResetPassword(ctx context.Context, email string) error

	// S3 Service
	UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetFiles(ctx context.Context, prefix string) ([]*S3Object, error)
	DeleteFile(ctx context.Context, id string) error
	DeleteFiles(ctx context.Context, prefix string) ([]*S3Object, error)

	// User Service
	GetUser(ctx context.Context, accessToken string) (*User, error)
	GetUsers(ctx context.Context, params *FilterUserParams) (*UserResult, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	GetUserByID(ctx context.Context, id string) (*User, error)
	UpdateUser(ctx context.Context, user *User) error
	UpdateUserRole(ctx context.Context, user *User) error
	ChangePasswordFromCognito(ctx context.Context, user *ChangePassword) error
	ChangePasswordFromDynamoDB(ctx context.Context, user *User) error
	DeleteUserFromDynamoDB(ctx context.Context, userId string) error
	DeleteUserFromCognito(ctx context.Context, userID string) error
	LogoutUser(ctx context.Context, accessToken string) error
	SetOTP(ctx context.Context, Email string) (string, error)
	GetOTP(ctx context.Context, email string) (string, error)
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
	GetItems(ctx context.Context, pivot string, limit int64) (*UserResult, error)
	GetItemsByRole(ctx context.Context, role, pivot string, limit int64) (*UserResult, error)
	DeleteItemByID(ctx context.Context, id string) error
	RefreshToken(ctx context.Context, refreshToken string) (*cognitoidentityprovider.InitiateAuthOutput, error)
	UpdatePasswordFromCognito(ctx context.Context, user *ChangePassword) error
	UpdatePasswordFromDynamoDb(ctx context.Context, user *User) error
	Logout(ctx context.Context, accessToken string) (*cognitoidentityprovider.GlobalSignOutOutput, error)
	UpdateUserRole(ctx context.Context, user *User) error
	UpdateUserProfile(ctx context.Context, user *User) error
	ResetCognitoPassword(ctx context.Context, email string) error
	StoreOtp(ctx context.Context, otp, email string) error
	GetOtpFromRedis(ctx context.Context, email string) (string, error)
}

type FileRepo interface {
	Upload(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error)
	GetList(ctx context.Context, prefix string) ([]*S3Object, error)
	Delete(ctx context.Context, id string) error
}
