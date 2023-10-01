package rest

import (
	"crypto/rand"
	"encoding/base64"
)

func generateRandomPassword() string {
	length := 8
	randBytes := make([]byte, length)
	rand.Read(randBytes)
	return base64.URLEncoding.EncodeToString(randBytes)
}
