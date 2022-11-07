package handlers

import (
	"errors"
	"fmt"
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

// GetByID		タンポポ単体の取得
// @Summary     タンポポ単体取得
// @Description タンポポの単体を取得する。
// @Tags        Dandelions
// @Param       id  path     string true "Dandelion ID"
// @Accept      json
// @Produce     json
// @Success     200 {object} presenter.Dandelion
// @Router      /dandelions/{id} [get]
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

// Create		タンポポの登録
// @Summary     タンポポ登録
// @Description タンポポを登録する。
// @Tags        Dandelions
// @Param   image    query string true "写真"
// @Param   statement    query string true "特徴"
// @Param   lat query string true "緯度"
// @Param   lng    query string true "経度"
// @Param   landmark query string true "目印"
// @Param   type    query string true "場所"
// @Param   impression query string true "感想"
// @Accept      json
// @Produce     json
// @Success     201
// @Failure     401
// @Router      /dandelions [post]
func (dh *DandelionHandler) Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		userID := c.Get("user_id")
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
