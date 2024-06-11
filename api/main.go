package main

import (
	"os"

	"api/routes"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	// router.Use(cors.Default())
	router.Use(CORSMiddleware())
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
