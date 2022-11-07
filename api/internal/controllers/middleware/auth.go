package middleware

import (
	"fmt"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"net/http"
)

var store = sessions.NewCookieStore([]byte("SESSION_KEY"))

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, _ := store.Get(c.Request(), "_session")
		if session.Values["user_id"] == nil {
			return c.NoContent(http.StatusUnauthorized)
		}
		fmt.Println(session.Values["user_id"])
		c.Set("user_id", session.Values["user_id"])
		return next(c)
	}
}

func SetUserIDSession(w http.ResponseWriter, r *http.Request, userID string) error {
	session, _ := store.Get(r, "_session")
	session.Values["user_id"] = userID
	// Save it before we write to the response/return from the handler.
	err := session.Save(r, w)
	if err != nil {
		return err
	}
	return nil
}
