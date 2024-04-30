package routes

import (
	"api/models"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()
var appointmentCollection *mongo.Collection = OpenCollection(Client, "appointment")

func AddAppointment(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	var appointment models.Appointment
	if err := c.BindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validationErr := validate.Struct(appointment)
	if validationErr != nil {
		errorResponse := models.ErrorResponse{
			Message: "",
			Code:    400,
			Errors:  []string{validationErr.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}
	appointment.ID = primitive.NewObjectID()
	appointment.CreatedAt = time.Now().UTC()
	result, insertErr := appointmentCollection.InsertOne(ctx, appointment)
	if insertErr != nil {
		msg := fmt.Sprintf("Error while creating an appointment")

		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{validationErr.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result)
}

func GetAppointments(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)

	service := c.Query("service")
	time := c.Query("time")
	date := c.Query("date")

	_ = service
	_ = time
	_ = date

	cursor, err := appointmentCollection.Find(ctx, bson.M{})
	if err != nil {
		msg := fmt.Sprintf("appointments failed to retrieve")

		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
	}
	var result []bson.M
	if err = cursor.All(ctx, &result); err != nil {
		msg := fmt.Sprintf("appointments failed to retrieve")
		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
	}

	defer cancel()

	c.JSON(http.StatusOK, result)
}
func DeleteAppointment(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	id := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(id)
	_, err := appointmentCollection.DeleteOne(ctx, bson.M{"_id": docId})
	if err != nil {
		msg := fmt.Sprintf("Error while canceling the appointment.")

		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
	}
	defer cancel()
	c.JSON(http.StatusOK, "")
}
