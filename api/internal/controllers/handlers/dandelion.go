package handlers

import (
	"errors"
	"fmt"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/ta715/dande-api/internal/controllers/presenter"
	"github.com/ta715/dande-api/internal/models"
	"io"
	"net/http"
	"os"
	"strconv"
)

type DandelionHandler struct {
	models *models.ModelHandler
}

func NewDandelionHandler(models *models.ModelHandler) *DandelionHandler {
	return &DandelionHandler{models: models}
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
		dandelions, err := dh.models.ListDandelion(c.Request().Context())
		if err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		return c.JSON(http.StatusOK, presenter.DandelionsResponse(dandelions))
	}
}

func (dh *DandelionHandler) GetByID() echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		dandelion, err := dh.models.GetDandelionByID(c.Request().Context(), id)
		if err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		return c.JSON(http.StatusOK, presenter.DandelionResponse(dandelion))
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

		statement := c.FormValue("statement")
		lat, err := strconv.ParseFloat(c.FormValue("lat"), 64)
		lng, err := strconv.ParseFloat(c.FormValue("lng"), 64)
		if err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		landmark := c.FormValue("landmark")
		placeType := c.FormValue("placeType")
		impression := c.FormValue("impression")
		userID := sess.Values["user_id"]

		// FormValue書く
		err = dh.models.CreateDandelion(
			c.Request().Context(),
			base64,
			statement,
			lat,
			lng,
			landmark,
			placeType,
			userID.(string),
			impression,
		)
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
	buf := make([]byte, 64)
	for {
		n, err := file.Read(buf)
		if n == 0 {
			break
		}
		if err != nil {
			panic(err)
		}
		fmt.Println(string(buf))
	}
	return buf
}
