package models

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Deadline    string `json:"deadline"`
	Experience  string `json:"experience"`
}
