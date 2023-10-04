package service

import (
	"context"
	"mime/multipart"
)

func (s *service) UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	fileURL, err := s.fileRepo.Upload(ctx, file, fileHeader)
	if err != nil {
		return "", err
	}

	return fileURL, err
}

func (s *service) GetFiles(ctx context.Context) ([]*S3FeatureImage, error) {
	imageUrlList, err := s.fileRepo.GetList(ctx)
	if err != nil {
		return nil, err
	}

	return imageUrlList, nil
}
