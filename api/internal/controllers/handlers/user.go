package handlers

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
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
// @Produce json
// @Param   last_name    query string true "苗字"
// @Param   first_name   query string true "名前"
// @Param   address      query string true "住所"
// @Param   phone_number query string true "電話"
// @Param   email        query string true "メールアドレス"
// @Param   password     query string true "パスワード"
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
// @Param   email        query string true "メールアドレス"
// @Param   password     query string true "パスワード"
// @Success 201
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

		sess, _ := session.Get("sessionId", c)
		sess.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   86400 * 7,
			HttpOnly: true,
		}
		sess.Values["user_id"] = "userid"
		sess.Save(c.Request(), c.Response())

		return c.NoContent(http.StatusOK)
	}
}
