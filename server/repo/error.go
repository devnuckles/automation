package repo

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/schemetech-developer/automation/service"
)

type ErrorRepo interface {
	service.ErrorRepo
}

type errorRepo struct {
	tableName string
	svc       dynamodbiface.DynamoDBAPI
}

func NewErrorRepo(tableName string, svc dynamodbiface.DynamoDBAPI) ErrorRepo {
	return &errorRepo{
		tableName: tableName,
		svc:       svc,
	}
}

func (r *errorRepo) GetError(ctx context.Context, internalCode string) (*service.ErrorDetail, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"InternalCode": {
				S: aws.String(internalCode),
			},
		},
	}

	result, err := r.svc.GetItemWithContext(ctx, input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			return nil, fmt.Errorf("failed to get item: %v - %v", aerr.Code(), aerr.Message())
		}
		return nil, fmt.Errorf("failed to get item: %v", err)
	}

	var error *service.ErrorDetail
	err = dynamodbattribute.UnmarshalMap(result.Item, &error)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal DynamoDB item: %v", err)
	}

	return error, nil
}
