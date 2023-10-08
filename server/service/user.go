package service

type User struct {
	ID          string `json:"sub"`
	Username    string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	PhoneNumber string `json:"phone_number"`
	Image       string `json:"picture"`
	Role        string `json:"custom:role"`
	Status      string `json:"custom:status"`
	CreatedAt   int64  `json:"CreatedAt"`
	CreatedBy   string `json:"custom:createdBy"`
}

type FilterUserParams struct {
	Role  string `json:"Role"`
	Pivot string `json:"Pivot"`
	Limit int64  `json:"Limit"`
	Offset int64 `json:"Offset"`
}

type UserResult struct {
	NextPivot string  `json:"NextPivot"`
	Users     []*User `json:"Users"`
}