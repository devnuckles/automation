package service

import (
	"context"
	"mime/multipart"
)

func (s *service) UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader) (*S3Object, error) {
	fileItem, err := s.fileRepo.Upload(ctx, file, fileHeader)
	if err != nil {
		return nil, err
	}

	return fileItem, err
}

func (s *service) GetFiles(ctx context.Context) ([]*S3Object, error) {
	files, err := s.fileRepo.GetList(ctx)
	if err != nil {
		return nil, err
	}

	return files, nil
}

func (s *service) DeleteFile(ctx context.Context, id string) error {
	err := s.fileRepo.Delete(ctx, id)
	if err != nil {
		return err
	}

	return nil
}
