package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/util"
)

func (s *Server) uploadFeatureImages(ctx *gin.Context) {
	err := ctx.Request.ParseMultipartForm(10 << 20)
	if err != nil {
		logger.Error(ctx, "File Size more than 10 MB", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_BAD_REQUEST, "Bad Request"))
		return
	}

	fileHeaders := ctx.Request.MultipartForm.File["file"]
	metas := ctx.Request.MultipartForm.Value["meta"]

	if len(fileHeaders) != len(metas) {
		logger.Error(ctx, "Mismathch in number of metas & files", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_BAD_REQUEST, "Bad Request"))
		return
	}

	res := make([]*UploadFeatureImageResponse, 0)
	for i, fileHeader := range fileHeaders {
		file, err := fileHeader.Open()
		if err != nil {
			logger.Error(ctx, "Could not read file", err)
			ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
			return
		}

		metaData := map[string]*string{
			"imageInfo": &metas[i],
		}

		fileURL, err := s.svc.UploadFile(ctx, file, fileHeader, metaData)

		if err != nil {
			logger.Error(ctx, "Could not upload files", err)

			if len(res) > 0 {
				for j := i; j < len(fileHeaders); j++ {
					res = append(res, &UploadFeatureImageResponse{
						ImageUrl: fileHeader.Filename,
						Meta:     metas[j],
						Status:   "Unsuccessfull",
					})
				}
				ctx.JSON(http.StatusMultiStatus, s.svc.Response(ctx, "Upload was successfull partially", res))
			} else {
				ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
			}

			return
		}

		res = append(res, &UploadFeatureImageResponse{
			ImageUrl: fileURL,
			Meta:     metas[i],
			Status:   "successfull",
		})
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Created Successfully", res))
}
