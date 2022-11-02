package models

import "github.com/jmoiron/sqlx"

type ModelHandler struct {
	db *sqlx.DB
}

func NewModelHandler(db *sqlx.DB) *ModelHandler {
	return &ModelHandler{db: db}
}
