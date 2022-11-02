package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/ta715/dande-api/internal/controllers/handlers"
)

func NewRoutes(e *echo.Group, dh *handlers.DandelionHandler, uh *handlers.UserHandler) {
	e.GET("/dandelions", dh.List())
	e.POST("/dandelions", dh.Create())
	e.GET("/dandelions/:id", dh.GetByID())

	e.POST("/auth/signup", uh.SignUp())
	e.POST("/auth/login", uh.SignIn())

}
