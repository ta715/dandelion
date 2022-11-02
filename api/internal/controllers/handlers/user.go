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

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

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
