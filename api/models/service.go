package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Service struct {
	ID          primitive.ObjectID `bson:"_id"`
	Name        string             `json:"name"`
	Price       int32              `json:"price"`
	Description string             `json:"description"`
	Image       string             `json:"image"`
	Slug        string             `json:"slug"`
	Status      string             `json:"status"`
	CreatedAt   time.Time          `bson:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at"`
}
type ServiceUpdate struct {
	Name        string    `json:"name"`
	Price       int32     `json:"price"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Status      string    `json:"status"`
	UpdatedAt   time.Time `bson:"updated_at"`
}
