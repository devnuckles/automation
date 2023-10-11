package rest

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/schemetech-developer/automation/config"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/service"
)

type Server struct {
	router        *gin.Engine
	appConfig     *config.Application
	svc           service.Service
	cognitoConfig *config.Cognito
	jwt           *config.Token
	salt          *config.Salt
}

func NewServer(appConfig *config.Application, svc service.Service, cognitoConfig *config.Cognito, jwt *config.Token, salt *config.Salt) (*Server, error) {
	server := &Server{
		appConfig:     appConfig,
		svc:           svc,
		cognitoConfig: cognitoConfig,
		jwt:           jwt,
		salt: salt,
	}

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("userStatus", validUserStatus)
		v.RegisterValidation("userRole", validUserRole)
	}

	server.setupRouter()
	return server, nil
}

func (server *Server) setupRouter() {
	router := gin.Default()

	router.Use(corsMiddleware) // CORS middleware

	router.Use(logger.ModifyContext) // log middleware

	router.Static("/docs", "./docs") // swagger documentation

	router.GET("/api/test", server.test) // healtch check

	// Auth APIs
	router.POST("/api/auth/signup", server.signupUser)
	router.POST("/api/auth/login", server.loginUser)

	////////// Protected Routes ///////////
	// authRoutes := router.Group("/").Use(server.authMiddleware())

	//////// User Routes ////////////
	router.POST("/api/add/user", server.addUser)
	router.POST("/api/logout", server.logoutUser)

	//Feature Images APIs
	router.POST("/api/features/images", server.uploadFeatureImages)
	router.GET("/api/features/images", server.getFeatureImages)
	router.DELETE("/api/features/images/:id", server.deleteFeatureImage)
	router.DELETE("/api/features/images", server.deleteFeatureImages)

	// User APIs
	router.GET("/api/features/users/profile", server.getUserProfile)

	server.router = router
}

func (server *Server) Start() error {
	return server.router.Run(fmt.Sprintf("%s:%s", server.appConfig.Host, server.appConfig.Port))
}

// test godoc
// @Summary Test the server
// @Description Test the server by sending a request to this endpoint
// @Tags test
// @Accept json
// @Produce json
// @Success 200 {object} SuccessResponse
// @Router /api/test [get]
func (server *Server) test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, "testing")
}
