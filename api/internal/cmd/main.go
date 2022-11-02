package main

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ta715/dande-api/internal/controllers/handlers"
	"github.com/ta715/dande-api/internal/controllers/routes"
	"github.com/ta715/dande-api/internal/models"
	"log"
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
	db, err := sqlx.Connect("mysql", "root:root@tcp(localhost:3306)/dandes?parseTime=true")
	if err != nil {
		log.Fatalln(err)
	}

	api := e.Group("")

	modelHandler := models.NewModelHandler(db)
	dandelionController := handlers.NewDandelionHandler(modelHandler)
	userController := handlers.NewUserHandler(modelHandler)
	routes.NewRoutes(api, dandelionController, userController)
	e.Logger.Fatal(e.Start(":8080"))

}
