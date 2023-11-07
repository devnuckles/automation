package rest

import "fmt"

func generateEmail(otp string) string {
	return fmt.Sprintf("Dear User,\n\nWe have received a request to reset your password. Please use the following code to proceed:\n\n%s\n\nIf you did not request a password reset, please ignore this email.\n\nThank you,\nThe KinoyeeIT Team", otp)
}
