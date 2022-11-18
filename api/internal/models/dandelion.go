package models

import (
	"context"
	"database/sql"
	"github.com/Clarifai/clarifai-go-grpc/proto/clarifai/api"
	"github.com/Clarifai/clarifai-go-grpc/proto/clarifai/api/status"
	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
	"log"
)

var API_KEY = "5763e8d6c603414f9d8feb530110caa5"
var MODEL_ID = "fe-dandelion"

// Dandelion タンポポのエンティティ
type Dandelion struct {
	ID         string  `db:"id"`
	Image      []byte  `db:"image"`
	Statement  string  `db:"statement"`
	Lat        float64 `db:"lat"`
	Lng        float64 `db:"lng"`
	Landmark   string  `db:"landmark"`
	Type       string  `db:"type"`
	IsNative   bool    `db:"is_native"`
	UserID     string  `db:"user_id"`
	Impression string  `db:"impression"`
}

func (mh *ModelHandler) GetDandelionByID(ctx context.Context, id string) (*Dandelion, error) {
	dandelion := &Dandelion{}
	err := mh.db.GetContext(ctx, dandelion, `
		SELECT id, image, statement, landmark, type, is_native, impression FROM dandelions
		WHERE id = ?
	`, id)

	if err == sql.ErrNoRows {
		log.Println("Data not found.")
		return nil, err
	}

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return dandelion, nil
}

func (mh *ModelHandler) ListDandelion(ctx context.Context) ([]*Dandelion, error) {
	var dandelions []*Dandelion
	err := mh.db.SelectContext(ctx, &dandelions, `
		SELECT id, image, statement, landmark, type, is_native, impression FROM dandelions`)

	if err == sql.ErrNoRows {
		log.Println("Data not found.")
		return nil, err
	}

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return dandelions, nil
}

func (mh *ModelHandler) CreateDandelion(
	ctx context.Context,
	image []byte,
	statement string,
	lat float64,
	lng float64,
	landmark string,
	placeType string,
	userID string,
	impression string,
) error {
	dandelion := &Dandelion{
		ID:         "",
		Image:      image,
		Statement:  statement,
		Lat:        lat,
		Lng:        lng,
		Landmark:   landmark,
		Type:       placeType,
		IsNative:   false,
		UserID:     userID,
		Impression: impression,
	}

	isNative, err := dandelion.isNativeByClarifai()
	if err != nil {
		return err
	}

	id, err := uuid.NewUUID()
	if err != nil {
		id = uuid.New()
	}

	dandelion.ID = id.String()
	dandelion.IsNative = isNative

	tx := mh.db.MustBeginTx(ctx, nil)
	_, err = mh.db.NamedExecContext(ctx, `
		INSERT INTO dandelions (id, image, statement, lat, lng, landmark, type, is_native, user_id, impression)
		VALUES (:id, :image, :statement, :lat, :lng, :landmark, :type, :is_native, :user_id, :impression)
	`, dandelion)

	if err != nil {
		log.Println(err)
		tx.Rollback()
		return err
	}
	if err = tx.Commit(); err != nil {
		return err
	}
	return nil
}

func (d *Dandelion) isNativeByClarifai() (bool, error) {
	//func connection(API_KEY string, MODEL_ID string) error {
	conn, err := grpc.Dial(
		"api.clarifai.com:443",
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	if err != nil {
		log.Fatalf("ERROR: コネクションに失敗(原因）-> %+v", err)
	}
	client := api.NewV2Client(conn)

	ctx := metadata.AppendToOutgoingContext(
		context.Background(),
		"Authorization", "Key "+API_KEY,
	)

	response, err := client.PostModelOutputs(
		ctx,
		&api.PostModelOutputsRequest{
			ModelId: MODEL_ID,
			Inputs: []*api.Input{
				{
					Data: &api.Data{
						Image: &api.Image{
							Base64: d.Image,
						},
					},
				},
			},
		})

	if err != nil {
		return false, err
	}

	if response.Status.Code != status.StatusCode_SUCCESS {
		log.Fatalf("ERROR: 異常なレスポンスを検知（原因）-> %s", response)
	}

	concept := response.Outputs[0].Data.Concepts[0]
	if concept.GetName() == "non-dandelion" {
		return false, NotFound
	}

	if concept.GetName() == "native" {
		return true, nil
	}

	return false, nil
}
