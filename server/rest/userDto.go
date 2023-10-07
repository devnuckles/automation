package rest

type userResponse struct {
	ID          string `json:"id"`
	Username    string `json:"username,omitempty"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phoneNumber,omitempty"`
	Image       string `json:"image,omitempty"`
	Role        string `json:"role"`
	Status      string `json:"status"`
	CreatedAt   int64  `json:"created_at,omitempty"`
	CreatedBy   string `json:"created_by,omitempty"`
}
