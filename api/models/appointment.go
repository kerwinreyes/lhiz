package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	ID        primitive.ObjectID `bson:"_id"`
	Service   string             `json:"service"`
	Price     float64            `json:"price"`
	Customer  string             `json:"customer"`
	Date      string             `json:"date"`
	Time      string             `json:"time"`
	CreatedAt time.Time          `json:"created_at"`
	UpdatedAt time.Time          `json:"updated_at"`
}

type AppointmentsRequest struct {
	Service  string `json:"service,omitempty"`
	Customer string `json:"name,omitempty"`
	Date     string `json:"date,omitempty"`
	Phone    string `json:"phone,omitempty"`
	Email    string `json:"email,omitempty"`
}
