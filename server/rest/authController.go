package rest

import (
	"fmt"
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

	password := generateRandomPassword()
	user := &service.User{
		Email:     req.Email,
		Password:  password,
		Role:      util.SUPER_ADMIN,
		Status:    util.APPROVED,
		CreatedBy: util.SYSADMIN,
	}

	err = s.svc.CreateUser(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	emailBody := fmt.Sprintf("Thank you for registering \r\n User Email: %s \r\n User Password: %s\n", user.Email, user.Password)
	err = s.svc.SendMail(ctx, []string{user.Email}, "Your Account was created Successfully", emailBody)

	if err != nil {
		logger.Error(ctx, "cannot send email to user", err)
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
		logger.Error(ctx, "User Not Found", err)
		ctx.JSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHORIZED_ERROR, "Invalid Credentials"))
		return
	}

	res := loginUserRes{
		AccessToken:  *token.AuthenticationResult.AccessToken,
		RefreshToken: *token.AuthenticationResult.RefreshToken,
		IdToken:      *token.AuthenticationResult.IdToken,
	}
	tokenExpiresIn := int(*token.AuthenticationResult.ExpiresIn)

	ctx.SetCookie(authorizationHeaderKey, res.AccessToken, tokenExpiresIn, "/", "", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfully logged in", res))
}
