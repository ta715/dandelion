package presenter

import "github.com/ta715/dande-api/internal/models"

type Dandelion struct {
	ID         string `json:"id"`
	Landmark   string `json:"landmark"`
	Type       string `json:"type"`
	IsNative   bool   `json:"is_native"`
	Image      []byte `json:"image"`
	Statement  string `json:"statement"`
	Impression string `json:"impression"`
}

func DandelionResponse(dandelion *models.Dandelion) *Dandelion {
	return &Dandelion{
		ID:         dandelion.ID,
		Landmark:   dandelion.Landmark,
		Type:       dandelion.Type,
		IsNative:   dandelion.IsNative,
		Image:      dandelion.Image,
		Statement:  dandelion.Statement,
		Impression: dandelion.Impression,
	}
}

func DandelionsResponse(dandelions []*models.Dandelion) []*Dandelion {
	var res []*Dandelion
	for _, dandelion := range dandelions {
		res = append(res, &Dandelion{
			ID:         dandelion.ID,
			Landmark:   dandelion.Landmark,
			Type:       dandelion.Type,
			IsNative:   dandelion.IsNative,
			Image:      dandelion.Image,
			Statement:  dandelion.Statement,
			Impression: dandelion.Impression,
		})
	}
	return res
}
