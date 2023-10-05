package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/util"
)

const PREFIX = "feature_image"

func (s *Server) uploadFeatureImages(ctx *gin.Context) {
	err := ctx.Request.ParseMultipartForm(10 << 20)
	if err != nil {
		logger.Error(ctx, "File Size more than 10 MB", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_BAD_REQUEST, "Bad Request"))
		return
	}

	fileHeaders := ctx.Request.MultipartForm.File["file"]

	res := make([]*UploadFeatureImageResponse, 0)

	for i, fileHeader := range fileHeaders {
		file, err := fileHeader.Open()
		if err != nil {
			logger.Error(ctx, "Could not read file", err)
			ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
			return
		}

		item, err := s.svc.UploadFile(ctx, file, fileHeader, PREFIX)

		if err != nil {
			logger.Error(ctx, "Could not upload files", err)
			if len(res) > 0 {
				for j := i; j < len(fileHeaders); j++ {
					res = append(res, &UploadFeatureImageResponse{
						ImageUrl: fileHeader.Filename,
						Status:   "unsuccessfull",
					})
				}
				ctx.JSON(http.StatusMultiStatus, s.svc.Response(ctx, "Upload was successfull partially", res))
			} else {
				ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
			}

			return
		}

		res = append(res, &UploadFeatureImageResponse{
			Id:       item.Id,
			ImageUrl: item.Url,
			Status:   "successfull",
		})
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Created Successfully", res))
}

func (s *Server) getFeatureImages(ctx *gin.Context) {
	imageUrlList, err := s.svc.GetFiles(ctx, PREFIX)
	if err != nil {
		logger.Error(ctx, "Could not get files", err)
		ctx.JSON(http.StatusNotFound, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	res := make([]*GetFeatureImageResponse, 0)
	for _, item := range imageUrlList {
		res = append(res, &GetFeatureImageResponse{
			Id:       item.Id,
			ImageUrl: item.Url,
		})
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Successfull", res))

}

func (s *Server) deleteFeatureImage(ctx *gin.Context) {
	id := ctx.Param("id")
	err := s.svc.DeleteFile(ctx, id)
	if err != nil {
		logger.Error(ctx, "Could not delete file", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Deleted Successfully", nil))
}

func (s *Server) deleteFeatureImages(ctx *gin.Context) {
	deletedItems, err := s.svc.DeleteFiles(ctx, PREFIX)
	if err != nil {
		logger.Error(ctx, "Could not delete file", err)
		if len(deletedItems) > 0 {
			res := make([]*DeleteFeatureImagePartialResponse, 0)
			for _, deletedItem := range deletedItems {
				res = append(res, &DeleteFeatureImagePartialResponse{
					Id:     deletedItem.Id,
					Status: "successfull",
				})
			}

			ctx.JSON(http.StatusMultiStatus, s.svc.Response(ctx, "Upload was successfull partially", res))
		} else {
			ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		}
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Deleted Successfully", nil))
}
