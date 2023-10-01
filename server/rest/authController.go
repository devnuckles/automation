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

const SYSADMIN = "SYSTEM_ADMIN"

func (s *Server) signupUser(ctx *gin.Context) {
	var req signupUserReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	password := generateRandomPassword()
	user := &service.User{
		Email:     req.Email,
		Password:  password,
		Role:      "super-admin",
		Status:    "approved",
		CreatedBy: SYSADMIN,
	}

	err = s.svc.CreateUser(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Successfully created", nil))
}

func (s *Server) loginUser(ctx *gin.Context) {
	var req loginUserReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	user := &service.User{
		Email:    req.Email,
		Password: req.Password,
	}
	token, err := s.svc.LoginUser(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	res := loginUserRes{
		AccessToken:  *token.AuthenticationResult.AccessToken,
		RefreshToken: *token.AuthenticationResult.RefreshToken,
	}

	ctx.SetCookie("token", res.AccessToken, 3600, "/", "", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfully logged in", res))
}

func generateRandomPassword() string {
	length := 8
	randBytes := make([]byte, length)
	rand.Read(randBytes)
	return base64.URLEncoding.EncodeToString(randBytes)
}
