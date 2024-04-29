package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Appointment struct {
	ID        primitive.ObjectID  `bson:"_id"`
	Service   *string             `json:"service"`
	Price     *float64            `json:"price"`
	Customer  *string             `json:"customer"`
	Date      *string             `json:"date"`
	Time      *string             `json:"time"`
	CreatedAt primitive.Timestamp `json:"createdAt,omitempty"`
	UpdatedAt primitive.Timestamp `json:"updatedAt,omitempty"`
}

type AppointmentsRequest struct {
	Service  *string `json:"service,omitempty"`
	Customer *string `json:"customer,omitempty"`
	Date     *string `json:"date,omitempty"`
	Time     *string `json:"time,omitempty"`
}
