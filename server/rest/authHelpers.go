package rest

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"

	"github.com/schemetech-developer/automation/service"
)

func generateRandomPassword() string {
	length := 8
	randBytes := make([]byte, length)
	rand.Read(randBytes)
	return base64.URLEncoding.EncodeToString(randBytes)
}

func generateEmailBody(user *service.User) string {

	return fmt.Sprintf("Thank you for registering \r\n User Email: %s \r\n User Password: %s\n", user.Email, user.Password)
}
