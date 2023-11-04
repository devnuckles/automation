package rest

type userResponse struct {
	ID          string `json:"id"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Image       string `json:"image,omitempty"`
	Role        string `json:"role"`
	Status      string `json:"status"`
	CreatedAt   int64  `json:"created_at,omitempty"`
	CreatedBy   string `json:"created_by,omitempty"`
}

type addUserReq struct {
	Firstname       string `form:"first_name" binding:"required,min=2,max=50"`
	Lastname        string `form:"last_name" binding:"required,min=2,max=50"`
	Email           string `form:"email" binding:"required,email"`
	Password        string `form:"password" binding:"required,min=8,max=30"`
	ConfirmPassword string `form:"confirm_password" binding:"required,eqfield=Password"`
	Role            string `form:"role" binding:"required"`
}

type changePasswordReq struct {
	OldPassword     string `json:"old_password" binding:"required"`
	NewPassword     string `json:"new_password" binding:"required,min=8,max=30"`
	ConfirmPassword string `json:"confirm_password" binding:"required,eqfield=NewPassword"`
}

type updateUserRoleReq struct {
	Role string `json:"role" binding:"required"`
}
