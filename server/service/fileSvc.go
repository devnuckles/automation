package service

import (
	"context"
	"mime/multipart"
)

func (s *service) UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, metadata map[string]*string) (string, error) {
	fileURL, err := s.fileRepo.Upload(ctx, file, fileHeader, metadata)
	if err != nil {
		return "", err
	}

	return fileURL, err
}
