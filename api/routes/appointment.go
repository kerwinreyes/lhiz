package routes

import (
	"api/models"
	"bytes"
	"context"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()
var auth smtp.Auth
var appointmentCollection *mongo.Collection = OpenCollection(Client, "appointment")

type Request struct {
	from    string
	to      []string
	subject string
	body    string
}

func NewRequest(to []string, subject, body, from string) *Request {
	return &Request{
		to:      to,
		subject: subject,
		body:    body,
		from:    from,
	}
}
func (r *Request) SendEmail() (bool, error) {
	mime := "MIME-version: 1.0;\r\nContent-Type: text/html; charset=\"UTF-8\";\r\n"

	subject := "Subject: " + r.subject + "!\n"
	msg := []byte("To: " + r.to[0] + "\r\n" +
		"From: " + r.from + "\r\n" +
		subject +
		mime +
		"\r\n" +
		r.body)
	addr := "smtp.gmail.com:587"

	if err := smtp.SendMail(addr, auth, r.from, r.to, msg); err != nil {
		return false, err
	}
	return true, nil
}
func (r *Request) ParseTemplate(templateFileName string, data interface{}) error {
	t, err := template.ParseFiles(templateFileName)
	if err != nil {
		return err
	}
	buf := new(bytes.Buffer)
	if err = t.Execute(buf, data); err != nil {
		return err
	}
	r.body = buf.String()
	return nil
}
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

	err := godotenv.Load("api/.env")
	// err := godotenv.Load(filepath.Join(os.Getenv("APP_PATH"), ".env"))

	if err != nil {
		msg := fmt.Sprintf("Error loading .env file")

		errorResponse := models.ErrorResponse{
			Message: msg,
			Code:    400,
			Errors:  []string{validationErr.Error()},
		}
		c.JSON(http.StatusInternalServerError, errorResponse)
	}

	mail := os.Getenv("EMAIL_ADDRESS")
	pass := os.Getenv("APP_PASSWORD")

	host := "smtp.gmail.com"

	// port := "587"

	auth = smtp.PlainAuth("", mail, pass, host)
	templateData := struct {
		Name string
		URL  string
	}{
		Name: appointment.Customer,
		URL:  "",
	}
	r := NewRequest([]string{appointment.Email}, "Appointment With Eliza", "Hello, World!", mail)
	if err := r.ParseTemplate("template/template.html", templateData); err == nil {
		_, err := r.SendEmail()
		if err != nil {
			log.Fatal("Error while sending Email", err.Error())
		}

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
