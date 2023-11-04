package cmd

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/go-redis/redis"

	"github.com/schemetech-developer/automation/cache"
	"github.com/schemetech-developer/automation/config"
	"github.com/schemetech-developer/automation/repo"
	"github.com/schemetech-developer/automation/rest"
	"github.com/schemetech-developer/automation/service"
)

func serveRest() {
	appConfig := config.GetApp()
	awsConfig := config.GetAws()
	tableConfig := config.GetTable()
	cognitoConfig := config.GetCognito()
	saltConfig := config.GetSalt()
	tokenConfig := config.GetToken()
	smtpConfig := config.GetSmtpHost()
	s3Config := config.GetS3()

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(awsConfig.Region),
	})
	if err != nil {
		panic(err)
	}

	ddbClient := dynamodb.New(sess)
	cognitoClient := cognitoidentityprovider.New(sess)
	s3Client := s3.New(sess)
	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	errorRepo := repo.NewErrorRepo(tableConfig.ErrorTableName, ddbClient)
	userRepo := repo.NewUserRepo(cognitoClient, cognitoConfig.ClientId, cognitoConfig.PoolId, ddbClient, tableConfig.UserTableName)
	fileRepo := repo.NewFileRepo(s3Client, s3Config.Bucket)

	cache := cache.NewCache(redisClient)

	svc := service.NewService(userRepo, fileRepo, errorRepo, cache, smtpConfig)
	server, err := rest.NewServer(appConfig, svc, cognitoConfig, tokenConfig, saltConfig)
	if err != nil {
		panic("Server can not start")
	}

	server.Start()
}
