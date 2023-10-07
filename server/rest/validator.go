package rest

import (
	"github.com/go-playground/validator/v10"
	"github.com/schemetech-developer/automation/util"
)

var validUserStatus validator.Func = func(fieldLevel validator.FieldLevel) bool {
	if userStatus, ok := fieldLevel.Field().Interface().(string); ok {
		return util.IsSupportedUserStatus(userStatus)
	}
	return false
}

var validUserRole validator.Func = func(fieldLevel validator.FieldLevel) bool {
	if userRole, ok := fieldLevel.Field().Interface().(string); ok {
		return util.IsSupportedUserRole(userRole)
	}
	return false
}
