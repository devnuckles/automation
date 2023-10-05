package repo

import (
	"context"
	"fmt"
	"mime/multipart"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/schemetech-developer/automation/service"
)

type FileRepo interface {
	service.FileRepo
}

type fileRepo struct {
	s3Client *s3.S3
	s3Bucket string
}

func NewFileRepo(s3Client *s3.S3, s3Bucket string) FileRepo {
	return &fileRepo{
		s3Client: s3Client,
		s3Bucket: s3Bucket,
	}
}

func (r *fileRepo) Upload(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, prefix string) (*service.S3Object, error) {
	fileName, err := createFileName(fileHeader, prefix)
	if err != nil {
		return nil, err
	}

	_, err = r.s3Client.PutObject((&s3.PutObjectInput{
		Bucket: aws.String(r.s3Bucket),
		Key:    aws.String(fileName),
		Body:   file,
	}))
	if err != nil {
		return nil, fmt.Errorf("cannot put file into s3: %v", err)
	}

	fileURL := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", r.s3Bucket, fileName)

	s3Obj := &service.S3Object{
		Id:  fileName,
		Url: fileURL,
	}

	return s3Obj, nil
}

func createFileName(fileHeader *multipart.FileHeader, prefix string) (string, error) {
	id, err := uuid.NewUUID()
	if err != nil {
		return "", fmt.Errorf("cannot create uuid: %v", err)
	}

	fileName := fmt.Sprintf("%s_%s%s", prefix, id, filepath.Ext(fileHeader.Filename))

	return fileName, nil
}

func (r *fileRepo) GetList(ctx context.Context, prefix string) ([]*service.S3Object, error) {

	input := &s3.ListObjectsV2Input{
		Bucket: aws.String(r.s3Bucket),
		Prefix: &prefix,
	}

	res, err := r.s3Client.ListObjectsV2(input)
	if err != nil {
		return nil, err
	}

	files := make([]*service.S3Object, 0)
	for _, s3Obj := range res.Contents {
		fileURL := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", r.s3Bucket, *s3Obj.Key)
		files = append(files, &service.S3Object{
			Id:  *s3Obj.Key,
			Url: fileURL,
		})
	}

	return files, nil
}

func (r *fileRepo) Delete(ctx context.Context, objectKey string) error {
	input := &s3.DeleteObjectInput{
		Bucket: aws.String(r.s3Bucket),
		Key:    aws.String(objectKey),
	}

	_, err := r.s3Client.DeleteObject(input)

	if err != nil {
		return err
	}

	return nil
}
