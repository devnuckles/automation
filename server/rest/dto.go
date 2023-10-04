package rest

type SuccessResponse struct {
	Message string `json:"message"`
}

type UploadFeatureImageResponse struct {
	ImageUrl string `json:"imageUrl"`
	Status   string `json:"status"`
}

type GetFeatureImageResponse struct {
	ImageUrl string `json:"imageUrl"`
}
