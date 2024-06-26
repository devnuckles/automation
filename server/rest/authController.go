package rest

import (
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

	emailBody := generateEmailBody(user)
	err = s.svc.SendMail(ctx, []string{user.Email}, "Your Account was created Successfully", emailBody)

	if err != nil {
		logger.Error(ctx, "Could not send email to user", err)
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

	res := &loginUserRes{
		AccessToken:  *token.AuthenticationResult.AccessToken,
		RefreshToken: *token.AuthenticationResult.RefreshToken,
		IdToken:      *token.AuthenticationResult.IdToken,
	}
	tokenExpiresIn := int(*token.AuthenticationResult.ExpiresIn)

	ctx.SetCookie(authorizationHeaderKey, res.AccessToken, tokenExpiresIn, "/", "", false, true)
	ctx.SetCookie(authenticationHeaderKey, res.IdToken, tokenExpiresIn, "/", "", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfully logged in", res))
}

func (s *Server) refrehToken(ctx *gin.Context) {
	var req refrehTokenReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	token, err := s.svc.RefreshToken(ctx, req.RefreshToken)
	if err != nil {
		logger.Error(ctx, "cannot generate access_token", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	res := &refrehTokenRes{
		AccessToken: *token.AuthenticationResult.AccessToken,
		IdToken:     *token.AuthenticationResult.IdToken,
	}
	tokenExpiresIn := int(*token.AuthenticationResult.ExpiresIn)

	ctx.SetCookie(authorizationHeaderKey, res.AccessToken, tokenExpiresIn, "/", "", false, true)
	ctx.SetCookie(authenticationHeaderKey, res.IdToken, tokenExpiresIn, "/", "", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfull", res))
}

func (s *Server) logoutUser(ctx *gin.Context) {
	accessToken, err := ctx.Cookie(authorizationHeaderKey)

	if err != nil {
		logger.Error(ctx, "no cookie found", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	err = s.svc.Logout(ctx, accessToken)
	if err != nil {
		logger.Error(ctx, "internal server error", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.SetCookie(authorizationHeaderKey, "", -1, "/", "", false, true)
	ctx.SetCookie(authenticationHeaderKey, "", -1, "/", "", false, true)
	ctx.Status(http.StatusOK)
}
