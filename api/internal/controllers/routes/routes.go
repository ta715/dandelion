package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/ta715/dande-api/internal/controllers/handlers"
)

func NewRoutes(e *echo.Group, dh *handlers.DandelionHandler) {
	e.GET("/dandelions", dh.List())
}
