package service

type User struct {
	ID          string `json:"Id"`
	Username    string `json:"Username"`
	Email       string `json:"Email"`
	Password    string `json:"Password"`
	PhoneNumber string `json:"PhoneNumber"`
	Image       string `json:"image"`
	Role        string `json:"Role"`
	Status      string `json:"Status"`
	CreatedAt   int64  `json:"CreatedAt"`
	CreatedBy   string `json:"CreatedBy"`
}
