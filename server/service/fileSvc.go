package service

import (
	"context"
	"mime/multipart"
)

func (s *service) UploadFile(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*S3Object, error) {
	item, err := s.fileRepo.Upload(ctx, file, fileHeader, prefix)
	if err != nil {
		return nil, err
	}

	return item, err
}

func (s *service) GetFiles(ctx context.Context, prefix string) ([]*S3Object, error) {
	files, err := s.fileRepo.GetList(ctx, prefix)
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

func (s *service) DeleteFiles(ctx context.Context, prefix string) ([]*S3Object, error) {
	files, err := s.fileRepo.GetList(ctx, prefix)
	if err != nil {
		return nil, err
	}

	deletedFiles := make([]*S3Object, 0)

	for _, file := range files {
		err := s.fileRepo.Delete(ctx, file.Id)
		if err != nil {
			return deletedFiles, err
		}

		deletedFiles = append(deletedFiles, file)
	}

	return deletedFiles, err
}
