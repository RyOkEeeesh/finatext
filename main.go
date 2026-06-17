package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
)

type PastalCode string

type AddrReq struct {
	PostalCode PastalCode `form:"postal_code" binding:"required,alphanum,min=7,max=8"`
}

type Location struct {
	Prefecture string `json:"prefecture"`
	City       string `json:"city"`
	Town       string `json:"town"`
	X          float64 `json:"x,string"`
	Y          float64 `json:"y,string"`
	PostalCode PastalCode `json:"postal"`
}

type PostalApiRes struct {
	Response struct {
		Location []Location `json:"location"`
	} `json:"response"`
}

const apiUrl = "https://geoapi.heartrails.com/api/json?method=searchByPostal&postal="

func main() {
	r := gin.Default()

	r.GET("/", index)
	r.GET("/address", addr)

	r.Run(":8080")
}

func index(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
    "message": "Welcome to Access Log API!",
  })
}

func addr(c *gin.Context) {
	var req AddrReq

	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Validation failed",
			"details": err.Error(),
		})
		return
	}

	locations, err := getLocation(req.PostalCode)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "location not found",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"locations": locations,
	})
}

func getLocation(postalCode PastalCode) ([]Location, error) {
	url := apiUrl + string(postalCode)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var apiRes PostalApiRes

	if err := json.NewDecoder(resp.Body).Decode(&apiRes); err != nil {
		return  nil, err
	}

	if len(apiRes.Response.Location) == 0 {
    return nil, errors.New("location not found")
  }

	return apiRes.Response.Location, nil
}