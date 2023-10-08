package rest

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
)

func (s *Server) getUsers(ctx *gin.Context) {
	role := ctx.Query("role")
	pivot := ctx.Query("pivot")
	limit, err := strconv.Atoi(ctx.Query("limit"))
	if err != nil {
		logger.Error(ctx, "limit must be an integer, but it's ok", err)
		limit = 10
	}

	logger.Info(ctx, "req payload", fmt.Sprintf("Role: %s Pivot: %s Limit: %d", role, pivot, limit))

}
