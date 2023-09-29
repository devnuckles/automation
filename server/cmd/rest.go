package cmd

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
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

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(awsConfig.Region),
	})
	if err != nil {
		panic(err)
	}

	ddbClient := dynamodb.New(sess) 

	errorRepo := repo.NewErrorRepo(tableConfig.ErrorTableName, ddbClient)
	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	cache := cache.NewCache(redisClient)
	svc := service.NewService(errorRepo, cache)
	server, err := rest.NewServer(appConfig, svc)
	if err != nil {
		panic("Server can not start")
	}

	server.Start()
}
