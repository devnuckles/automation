package rest

type signupUserReq struct {
	Email string `json:"email" binding:"required,email,max=100"`
}
