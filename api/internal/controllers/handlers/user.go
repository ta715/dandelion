package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/ta715/dande-api/internal/controllers/middleware"
	"github.com/ta715/dande-api/internal/models"
	"net/http"
)

type UserHandler struct {
	models *models.ModelHandler
}

func NewUserHandler(models *models.ModelHandler) *UserHandler {
	return &UserHandler{models: models}
}

// SignUp はアカウント登録するためのHTTPのエンドポイントです。
// @Summary アカウント登録
// @Tags    Users
// @Header  application/x-www-form-urlencoded
// @Produce json
// @Param   last_name    formData string true "苗字"
// @Param   first_name   formData string true "名前"
// @Param   address      formData string true "住所"
// @Param   phone_number formData string true "電話"
// @Param   email        formData string true "メールアドレス"
// @Param   password     formData string true "パスワード"
// @Success 201
// @Router  /auth/signup [post]
func (uh *UserHandler) SignUp() echo.HandlerFunc {
	return func(c echo.Context) error {
		lastName := c.FormValue("last_name")
		firstName := c.FormValue("first_name")
		address := c.FormValue("address")
		phoneNumber := c.FormValue("phone_number")
		email := c.FormValue("email")
		password := c.FormValue("password")
		_, err := uh.models.CreateUserByEmail(
			c.Request().Context(),
			lastName,
			firstName,
			address,
			phoneNumber,
			email,
			password,
		)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.NoContent(http.StatusCreated)
	}
}

// SignIn はログインするためのHTTPのエンドポイントです。
// @Summary ログイン
// @Tags    Users
// @Accept  text/plain
// @Produce json
// @Param   email    formData string true "メールアドレス"
// @Param   password formData string true "パスワード"
// @Success 201
// @Failure 401
// @Router  /auth/login [post]
func (uh *UserHandler) SignIn() echo.HandlerFunc {
	return func(c echo.Context) error {
		email := c.FormValue("email")
		password := c.FormValue("password")

		// Emailをもとにユーザを持ってくる(GetByEmail)
		user, err := uh.models.GetUserByEmail(c.Request().Context(), email)
		if err != nil {
			return c.NoContent(http.StatusUnauthorized)
		}
		// ユーザがない場合は401
		// ユーザのパスワードと入力したパスワードが合ってるか確認
		err = user.IsPasswordVerified(password)
		// 間違ってる場合は401
		if err != nil {
			return c.NoContent(http.StatusUnauthorized)
		}

		middleware.SetUserIDSession(c.Response(), c.Request(), user.ID)

		return c.NoContent(http.StatusOK)
	}
}

// Me はログインするためのHTTPのエンドポイントです。
// @Summary プロフィール取得
// @Tags    Users
// @Accept  text/plain
// @Produce json
// @Success 200
// @Failure 401
// @Router  /me [get]
func (uh *UserHandler) Me() echo.HandlerFunc {
	return func(c echo.Context) error {
		userID := c.Get("user_id")
		return c.String(http.StatusOK, userID.(string))
	}
}
