package rest

type SuccessResponse struct {
	Message string `json:"message"`
}

type UploadFeatureImageResponse struct {
	ImageUrl string `json:"imageUrl"`
	Meta     string `json:"meta"`
	Status   string `json:"status"`
}
