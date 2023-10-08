package service

type User struct {
	ID          string `json:"Id"`
	Username    string `json:"Username"`
	Firstname   string `json:"FirstName"`
	Lastname    string `json:"LastName"`
	Email       string `json:"Email"`
	Password    string `json:"Password"`
	PhoneNumber string `json:"PhoneNumber"`
	Image       string `json:"Picture"`
	Role        string `json:"custom:role"`
	Status      string `json:"custom:status"`
	CreatedAt   int64  `json:"CreatedAt"`
	CreatedBy   string `json:"custom:createdBy"`
}

type FilterUserParams struct {
	Role   string `json:"Role"`
	Pivot  string `json:"Pivot"`
	Limit  int64  `json:"Limit"`
	Offset int64  `json:"Offset"`
}

type UserResult struct {
	NextPivot string  `json:"NextPivot"`
	Users     []*User `json:"Users"`
}
