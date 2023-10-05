package rest

type SuccessResponse struct {
	Message string `json:"message"`
}

type UploadFeatureImageResponse struct {
	Id       string `json:"id"`
	ImageUrl string `json:"imageUrl"`
	Status   string `json:"status"`
}

type GetFeatureImageResponse struct {
	Id       string `json:"id"`
	ImageUrl string `json:"imageUrl"`
}

type DeleteFeatureImagePartialResponse struct {
	Id     string `json:"id"`
	Status string `json:"status"`
}
