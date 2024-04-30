package routes

import (
	"api/models"
	"api/utils"
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var serviceCollection *mongo.Collection = OpenCollection(Client, "services")

func GetServices(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// var services []models.ServiceResponse

	cursor, err := serviceCollection.Find(ctx, bson.M{})
	if err != nil {
		msg := fmt.Sprintf("services failed to retrieve")

		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
		return
	}
	var result []models.Service
	if err = cursor.All(ctx, &result); err != nil {
		msg := fmt.Sprintf("services failed to retrieve")
		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
		return

	}
	defer cancel()
	c.JSON(http.StatusOK, result)
}
func AddService(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)

	var service models.Service
	if err := c.BindJSON(&service); err != nil {

		errorResponse := models.ErrorResponse{
			Message: "Error on getting data",
			Code:    http.StatusBadRequest,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}
	validationErr := validate.Struct(service)
	if validationErr != nil {
		errorResponse := models.ErrorResponse{
			Message: "Validate Error",
			Code:    http.StatusBadRequest,
			Errors:  []string{validationErr.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	service.ID = primitive.NewObjectID()
	service.CreatedAt = time.Now().UTC()
	service.Slug = utils.ConvertStringToSlug(service.Name)
	service.Status = utils.STATUS_ACTIVE
	result, err := serviceCollection.InsertOne(ctx, service)
	if err != nil {
		errorResponse := models.ErrorResponse{
			Message: "Error while inserting service.",
			Code:    http.StatusBadRequest,
			Errors:  []string{validationErr.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
	}
	defer cancel()
	c.JSON(http.StatusOK, result)
}
func UpdateService(c *gin.Context) {
	id := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(id)
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)

	var service models.ServiceUpdate

	if err := c.BindJSON(&service); err != nil {

		msg := fmt.Sprintf("Error while getting the body")
		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
		return

	}
	service.UpdatedAt = time.Now().UTC()
	result, err := serviceCollection.UpdateOne(
		ctx,
		bson.M{"_id": docId},
		bson.D{{
			"$set", service,
		}})
	if err != nil {
		msg := fmt.Sprintf("Error while updating a service")
		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}
	log.Println("result", result)

	defer cancel()
	c.JSON(http.StatusOK, "")
}
func DeleteService(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	id := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(id)
	_, err := serviceCollection.DeleteOne(ctx, bson.M{"_id": docId})
	if err != nil {
		msg := fmt.Sprintf("Error while deleting a service")
		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{err.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
		return
	}
	defer cancel()
	c.JSON(http.StatusOK, "")
}
