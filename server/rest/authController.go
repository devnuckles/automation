package rest

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/service"
	"github.com/schemetech-developer/automation/util"
)

func (s *Server) signupUser(ctx *gin.Context) {
	var req signupUserReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	user := &service.User{
		Email: req.Email,
		Password: generateRandomPassword(8),
	}
	err = s.svc.CreateUser(ctx, user)

	if err != nil {  	
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Successfully created", nil))
}

func generateRandomPassword(length int) string {
    randBytes := make([]byte, length)
    rand.Read(randBytes)
    return base64.URLEncoding.EncodeToString(randBytes)
}
