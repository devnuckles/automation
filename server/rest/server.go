package rest

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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
}

func NewServer(appConfig *config.Application, svc service.Service, cognitoConfig *config.Cognito, jwt *config.Token) (*Server, error) {
	server := &Server{
		appConfig:     appConfig,
		svc:           svc,
		cognitoConfig: cognitoConfig,
		jwt:           jwt,
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

	router.POST("/api/auth/signup", server.signupUser)
	router.POST("/api/auth/login", server.loginUser)

	//Feature Images APIs
	router.POST("/api/features/images", server.uploadFeatureImages)
	router.GET("/api/features/images", server.getFeatureImages)
	router.DELETE("/api/features/images/:id", server.deleteFeatureImage)
	router.DELETE("/api/features/images", server.deleteFeatureImages)

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
