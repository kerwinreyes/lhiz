package main

import (
	"log"
	"os"

	"api/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err.Error())
		log.Fatal("Error loading .env file")
	}
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
