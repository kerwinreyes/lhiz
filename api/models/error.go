package models

import "time"

type ErrorResponse struct {
	Message   string    `json:"message"`
	Code      int       `json:"code"`
	Details   string    `json:"details,omitempty"`
	Errors    []string  `json:"errors,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}