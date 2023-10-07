package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/util"
)

func (s *Server) getUserProfile(ctx *gin.Context) {
	accessToken, err := ctx.Cookie(authorizationHeaderKey)

	if err != nil {
		logger.Error(ctx, "cannot get token", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad Request"))
		return
	}

	user, err := s.svc.GetUser(ctx, accessToken)

	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	if user == nil {
		logger.Error(ctx, "user not found", err)
		ctx.JSON(http.StatusNotFound, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	userRes := userResponse{
		ID:     user.ID,
		Email:  user.Email,
		Role:   user.Role,
		Status: user.Status,
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Fetched user successfully", userRes))
}
