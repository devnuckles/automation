package service

import (
	"context"
	"encoding/json"

	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/util"
)

type service struct {
	errRepo      ErrorRepo
	cache        Cache
}

func NewService(

	errorRepo ErrorRepo,
	cache Cache,
) Service {
	return &service{

		errRepo:      errorRepo,
		cache:        cache,
	}
}

func (s *service) Error(ctx context.Context, internalCode string, description string) *ErrorResponse {
	var errDetail *ErrorDetail

	// get from cache
	errString, err := s.cache.Get(internalCode)
	if err != nil {
		logger.Error(ctx, "cannot get from redis", err)
	}
	if len(errString) > 0 {
		err = json.Unmarshal([]byte(errString), &errDetail)
		if err != nil {
			logger.Error(ctx, "cannot unmarshal error detail", err)
		}
	}

	// found in cache
	if errDetail != nil && len(errDetail.InternalCode) == 0 {
		return &ErrorResponse{
			Timestamp:   util.GetCurrentTimestamp(),
			Description: description,
			Error:       errDetail,
		}
	}

	// not found in cache
	// get from db
	errDetail, err = s.errRepo.GetError(ctx, internalCode)
	if err != nil {
		logger.Error(ctx, "cannot get from db", err)
		return &ErrorResponse{
			Timestamp:   util.GetCurrentTimestamp(),
			Description: description,
			Error: &ErrorDetail{
				InternalCode: internalCode,
				MessageEn:    "Not Set",
				MessageBn:    "Not Set",
			},
		}
	}

	errResponse := &ErrorResponse{
		Timestamp:   util.GetCurrentTimestamp(),
		Description: description,
		Error:       errDetail,
	}

	return errResponse
}

func (s *service) Response(ctx context.Context, description string, data interface{}) *ResponseData {
	return &ResponseData{
		Timestamp:   util.GetCurrentTimestamp(),
		Description: description,
		Data:        data,
	}
}
