package service

type User struct {
	ID          string `json:"Id"`
	Username    string `json:"Username"`
	Firstname   string `json:"FirstName"`
	Lastname    string `json:"LastName"`
	Email       string `json:"Email"`
	Password    string `json:"Password"`
	PhoneNumber string `json:"PhoneNumber"`
	ImageURL    string `json:"ImageUrl"`
	Role        string `json:"Role"`
	Status      string `json:"Status"`
	CreatedAt   int64  `json:"CreatedAt"`
	CreatedBy   string `json:"CreatedBy"`
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

type ChangePassword struct {
	AccessToken string `json:"access_token"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}
