package handlers

import (
	"errors"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/ta715/dande-api/internal/models"
	"io"
	"net/http"
	"os"
)

type DandelionHandler struct {
	models *models.ModelHandler
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

func (dh *DandelionHandler) Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, _ := session.Get("session", c)
		if sess.Values["user_id"] == "" {
			return c.NoContent(http.StatusUnauthorized)
		}
		//-----------
		// Read file
		//-----------

		// Source
		file, err := c.FormFile("file")
		if err != nil {
			return err
		}
		src, err := file.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		// Destination
		dst, err := os.Create(file.Filename)
		if err != nil {
			return err
		}

		// Copy
		if _, err = io.Copy(dst, src); err != nil {
			return err
		}

		// 画像をBase64形式に変換
		base64 := FileToBase64(dst)

		// FormValue書く
		err = dh.models.CreateDandelion(c.Request().Context())
		if errors.Is(models.NotFound, err) {
			return c.NoContent(http.StatusBadRequest)
		}
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.NoContent(http.StatusCreated)
	}
}

func FileToBase64(file *os.File) []byte {
	// https://qiita.com/tchnkmr/items/b686adc4a7e144d48755
}
