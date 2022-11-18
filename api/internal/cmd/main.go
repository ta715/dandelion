package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ta715/dande-api/internal/controllers/handlers"
	"github.com/ta715/dande-api/internal/controllers/routes"
)

// @title Uta API
// @version 1.0
// @description This is Uta API for PLANE_WEB.
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8080
// @BasePath /
// server アプリケーションを組み立てるメソッド
func main() {
	e := echo.New()

	e.Use(middleware.CORS())

	api := e.Group("")

	dandelionController := handlers.NewDandelionHandler()
	routes.NewRoutes(api, dandelionController)
	e.Logger.Fatal(e.Start(":8080"))

	//db, err := sqlx.Connect("mysql", "root:test@tcp(db:3306)/app?parseTime=true")
	//if err != nil {
	//	log.Fatalln(err)
	//}
}
