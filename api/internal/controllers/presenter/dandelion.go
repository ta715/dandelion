package presenter

import "github.com/ta715/dande-api/internal/models"

type Dandelion struct {
	ID string `json:"id"`
}

func DandelionResponse(dandelion *models.Dandelion) *Dandelion {
	return nil
}

func DandelionsResponse(dandelions []*models.Dandelion) []*Dandelion {
	return nil
}
