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
var tokenOnce = sync.Once{}

type Table struct {
	ErrorTableName string `mapstructure:"ERROR_TABLE_NAME"`
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

type Token struct {
	SecretKey string `mapstructure:"JWT_SECRET_KEY"`
}

var appConfig *Application
var awsConfig *Aws
var tableConfig *Table
var cognitoConfig *Cognito
var tokenConfig *Token

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

	tableConfig = &Table{}
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

	tokenConfig = &Token{
		SecretKey: viper.GetString("JWT_SECRET_KEY"),
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
