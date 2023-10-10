package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/service"
	"github.com/schemetech-developer/automation/util"
	"golang.org/x/crypto/bcrypt"
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

func (s *Server) addUser(ctx *gin.Context) {
	var req addUserReq
	err := ctx.ShouldBind(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	user, err := s.svc.GetUserByEmail(ctx, req.Email)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	if user != nil {
		logger.Error(ctx, "already registered user with the email", req.Email)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_ALREADY_REGISTERED_ERROR, "Already registered with email"))
		return
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), s.salt.SecretKey)
	if err != nil {
		logger.Error(ctx, "cannot hash the password", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	userId, err := uuid.NewUUID()
	if err != nil {
		logger.Error(ctx, "cannot generate user id", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	user = &service.User{
		ID:        userId.String(),
		Firstname: req.Firstname,
		Lastname:  req.Lastname,
		Email:     req.Email,
		Password:  string(hashedPass),
		Role:      req.Role,
	}

	err = s.svc.CreateUser(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Successfully created", nil))
}

func (s *Server) deleteUser(ctx *gin.Context) {
	userID := ctx.Param("id")

	err := s.repo.DeleteUser(ctx, userID)
	if err != nil {
		logger.Error(ctx, "cannot delete user from Cognito", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	// Delete the user from DynamoDB
	err = s.repo.DeleteItem(ctx, userID)
	if err != nil {
		logger.Error(ctx, "cannot delete user from DynamoDB", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, util.APPROVED, "User deleted successfully"))
}
