package main

import (
	"os"

	"api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(cors.Default())
	//Appointment
	router.POST("/appointment", routes.AddAppointment)
	router.GET("/appointments", routes.GetAppointments)
	router.DELETE("/appointment/:id", routes.DeleteAppointment)
	//Service
	router.GET("/services", routes.GetServices)
	router.PUT("/service/:id", routes.UpdateService)
	router.POST("/service", routes.AddService)
	router.DELETE("/service/:id", routes.DeleteService)
	// router.GET("/appointment/:id", routes.GetAppointments)

	router.Run(":" + port)

}
