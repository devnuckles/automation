package rest

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/service"
	"github.com/schemetech-developer/automation/util"
	"golang.org/x/crypto/bcrypt"
)

const UserPrefix = "profile_picture"

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

func (s *Server) updateUser(ctx *gin.Context) {
	var req updateUserReq
	err := ctx.ShouldBind(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad Request"))
		return
	}

	file, fileHeader, err := ctx.Request.FormFile("file")
	if err != nil {
		logger.Error(ctx, "cannot extract filename", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}
	defer file.Close()

	fileURL, err := s.svc.UploadFile(ctx, file, fileHeader, UserPrefix)
	if err != nil {
		logger.Error(ctx, "cannot upload file to the S3", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)
	user, err := s.svc.GetUserByID(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	updatedUser := &service.User{
		ID:          user.ID,
		Username:    req.UserName,
		Firstname:   req.FirstName,
		Lastname:    req.LastName,
		Password:    user.Password,
		PhoneNumber: req.PhoneNumber,
		Image:       fileURL.Url,
		Role:        user.Role,
		Status:      user.Status,
		CreatedAt:   user.CreatedAt,
		CreatedBy:   user.CreatedBy,
	}

	err = s.svc.UpdateUser(ctx, updatedUser)
	if err != nil {
		logger.Error(ctx, "cannot update user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Sucessfully Updated The User", nil))
}

func (s *Server) deleteUser(ctx *gin.Context) {
	userID := ctx.Param("id")

	// Delete user from Cognito
	err := s.svc.DeleteUserFromCognito(ctx, userID)
	if err != nil {
		logger.Error(ctx, "cannot delete user from Cognito", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	// Delete user from DynamoDB
	err = s.svc.DeleteUserFromDynamoDB(ctx, userID)
	if err != nil {
		logger.Error(ctx, "cannot delete user from DynamoDB", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User successfully deleted"})
}

func (s *Server) changePassword(ctx *gin.Context) {
	var req changePasswordReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	accessToken, err := ctx.Cookie(authorizationHeaderKey)
	if err != nil {
		logger.Error(ctx, "error in getting cookie", err)
		ctx.JSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHORIZED_ERROR, "Unauthorized"))
		return
	}

	user := &service.ChangePassword{
		AccessToken: accessToken,
		OldPassword: req.OldPassword,
		NewPassword: req.NewPassword,
	}

	err = s.svc.ChangePasswordFromCognito(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot change user password in Cognito", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Successfully changed password", nil))
}

func (s *Server) updateUserRole(ctx *gin.Context) {
	userId := ctx.Param("id")
	user, err := s.svc.GetUserByID(ctx, userId)
	if err != nil {
		logger.Error(ctx, "Cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	if user == nil {
		logger.Error(ctx, "User not found", err)
		ctx.JSON(http.StatusNotFound, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	var req updateUserRoleReq
	err = ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad Request"))
		return
	}

	user.Role = req.Role

	err = s.svc.UpdateUserRole(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot update user role", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Updated user role successfully", nil))
}

func (s *Server) getUsers(ctx *gin.Context) {
	role := ctx.Query("role")
	pivot := ctx.Query("pivot")
	Offset, err := strconv.Atoi(ctx.Query("offset"))
	if err != nil {
		Offset = 0
	}

	limit, err := strconv.Atoi(ctx.Query("limit"))
	if err != nil {
		limit = 10
	}

	query := &service.FilterUserParams{
		Role:   role,
		Pivot:  pivot,
		Offset: int64(Offset),
		Limit:  int64(limit),
	}

	userResult, err := s.svc.GetUsers(ctx, query)
	if err != nil {
		logger.Error(ctx, "cannot get users", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	var users []*userResponse
	for _, u := range userResult.Users {
		userRes := &userResponse{
			ID:          u.ID,
			FirstName:   u.Firstname,
			LastName:    u.Lastname,
			Email:       u.Email,
			Role:        u.Role,
			PhoneNumber: u.PhoneNumber,
			Status:      u.Status,
			CreatedAt:   u.CreatedAt,
		}

		users = append(users, userRes)
	}

	userResponses := &getUsersRes{
		Users:     users,
		NextPivot: userResult.NextPivot,
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Fetched users successfully", userResponses))

}

func (s *Server) forgetPassword(ctx *gin.Context) {
	var req forgetPasswordReq

	err := ctx.ShouldBind(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	user, err := s.svc.GetUserByEmail(ctx, req.Email)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	if user == nil {
		logger.Error(ctx, "No User Found", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	otp := s.svc.GetOTP(ctx, req.Email)

	emailBody := generateEmail(otp)
	err = s.svc.SendMail(ctx, []string{req.Email}, "Request for Password Reset", emailBody)
	if err != nil {
		logger.Error(ctx, "cannot send OTP", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal Server Error"))
		return
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "OTP Sent Successfully", nil))
}
