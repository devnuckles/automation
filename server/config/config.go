package config

import (
	"fmt"
	"sync"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

var appOnce = sync.Once{}
var awsOnce = sync.Once{}
var tableOnce = sync.Once{}
var cognitoOnce = sync.Once{}
var saltOnce = sync.Once{}
var tokenOnce = sync.Once{}
var smtpOnce = sync.Once{}
var s3Once = sync.Once{}

type Table struct {
	ErrorTableName string `mapstructure:"ERROR_TABLE_NAME"`
	UserTableName     string `mapstructure:"USER_TABLE_NAME"`
}

type Cognito struct {
	ClientId string `mapstructure:"COGNITO_APP_CLIENT_ID"`
	PoolId   string `mapstructure:"COGNITO_USER_POOL_ID"`
}

type Application struct {
	Host string `mapstructure:"HOST"`
	Port string `mapstructure:"PORT"`
}

type Aws struct {
	AccessKeyId     string `mapstructure:"AWS_ACCESS_KEY_ID"`
	SecretAccessKey string `mapstructure:"AWS_SECRET_ACCESS_KEY"`
	Region          string `mapstructure:"AWS_REGION"`
}

type Token struct {}

type Smtp struct {
	Email    string `mapstructure:"SMTP_EMAIL"`
	Password string `mapstructure:"SMTP_PASSWORD"`
	Host     string `mapstructure:"SMTP_HOST"`
	Port     string `mapstructure:"SMTP_PORT"`
}

type S3 struct {
	Bucket string `mapstructure:"S3_BUCKET"`
}

type Salt struct {
	SecretKey int `mapstructure:"SECRET_SALT_KEY"`
}

var appConfig *Application
var awsConfig *Aws
var tableConfig *Table
var cognitoConfig *Cognito
var saltConfig *Salt
var tokenConfig *Token
var smtpConfig *Smtp
var s3Config *S3

func loadApp() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	appConfig = &Application{
		Host: viper.GetString("HOST"),
		Port: viper.GetString("PORT"),
	}
}

func loadAws() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	awsConfig = &Aws{
		AccessKeyId:     viper.GetString("AWS_ACCESS_KEY_ID"),
		SecretAccessKey: viper.GetString("AWS_SECRET_ACCESS_KEY"),
		Region:          viper.GetString("AWS_REGION"),
	}
}

func loadTable() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	tableConfig = &Table{
		UserTableName: viper.GetString("USER_TABLE_NAME"),
	}
}

func loadCognito() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	cognitoConfig = &Cognito{
		ClientId: viper.GetString("COGNITO_APP_CLIENT_ID"),
		PoolId:   viper.GetString("COGNITO_USER_POOL_ID"),
	}
}

func loadToken() {
	err := godotenv.Load((".env"))
	if err != nil {
		fmt.Println(".env file was not found, that's okay")
	}
	viper.AutomaticEnv()

	tokenConfig = &Token{}

}

func loadSmtp() {
	err := godotenv.Load((".env"))
	if err != nil {
		fmt.Println(".env file was not found, that's okay")
	}
	viper.AutomaticEnv()

	smtpConfig = &Smtp{
		Email:    viper.GetString("SMTP_EMAIL"),
		Password: viper.GetString("SMTP_PASSWORD"),
		Host:     viper.GetString("SMTP_HOST"),
		Port:     viper.GetString("SMTP_PORT"),
	}
}

func loadS3() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	s3Config = &S3{
		Bucket: viper.GetString("S3_BUCKET"),
	}
}

func loadSalt() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	saltConfig = &Salt{
		SecretKey: viper.GetInt("SECRET_SALT_KEY"),
	}
}

func GetApp() *Application {
	appOnce.Do(func() {
		loadApp()
	})
	return appConfig
}

func GetAws() *Aws {
	awsOnce.Do(func() {
		loadAws()
	})
	return awsConfig
}

func GetTable() *Table {
	tableOnce.Do(func() {
		loadTable()
	})
	return tableConfig
}

func GetCognito() *Cognito {
	cognitoOnce.Do(func() {
		loadCognito()
	})
	return cognitoConfig
}

func GetToken() *Token {
	tokenOnce.Do(func() {
		loadToken()
	})
	return tokenConfig
}

func GetSmtpHost() *Smtp {
	smtpOnce.Do(func() {
		loadSmtp()
	})
	return smtpConfig
}

func GetS3() *S3 {
	s3Once.Do(func() {
		loadS3()
	})
	return s3Config
}

func GetSalt() *Salt {
	saltOnce.Do(func() {
		loadSalt()
	})
	return saltConfig
}
