package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type DandelionHandler struct {
}

func NewDandelionHandler() *DandelionHandler {
	return &DandelionHandler{}
}

// List		タンポポ一覧の取得
// @Summary     タンポポ一覧取得
// @Description タンポポの一覧を取得する。
// @Tags        Dandelions
// @Accept      json
// @Produce     json
// @Success     200 {array} presenter.Dandelion
// @Router      /dandelions [get]
func (dh *DandelionHandler) List() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "list")
	}
}
