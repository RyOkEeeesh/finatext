package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"math"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PostalCode string

type AddrReq struct {
	PostalCode PostalCode `form:"postal_code" binding:"required,alphanum,min=7,max=8"`
}

type Location struct {
	Prefecture string     `json:"prefecture"`
	City       string     `json:"city"`
	Town       string     `json:"town"`
	X          float64    `json:"x,string"`
	Y          float64    `json:"y,string"`
	PostalCode PostalCode `json:"postal"`
}

type PostalApiRes struct {
	Response struct {
		Location []Location `json:"location"`
	} `json:"response"`
}

type AddrRes struct {
	PostalCode PostalCode `json:"postal_code"`
	HitCount   int        `json:"hit_count"`
	Address    string     `json:"address"`
	Distance   float64    `json:"tokyo_sta_distance"`
}

type AccessLogs struct {
	ID         uint       `gorm:"primaryKey;autoIncrement;not null"`
	PostalCode PostalCode `gorm:"type:varchar(8);not null" json:"postal_code"`
	CreatedAt  time.Time  `gorm:"type:timestamp;not null;default:CURRENT_TIMESTAMP" json:"created_at"`
}

type AccessCount struct {
	PostalCode string `gorm:"column:postal_code" json:"postal_code"`
	ReqCount   int64  `gorm:"column:request_count" json:"request_count"`
}

type AccessLogsRes struct {
	AccessLogs []AccessCount `json:"access_logs"`
}

const apiUrl = "https://geoapi.heartrails.com/api/json?method=searchByPostal&postal="

const (
	xt = 139.7673068
	yt = 35.6809591
	r  = 6371.0
)

var db *gorm.DB

func initDB() *gorm.DB {
	var err error
	_ = godotenv.Load()

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		host, user, password, dbname, port,
	)

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("DB接続失敗: " + err.Error())
	}
	return db
}

func main() {
	initDB().AutoMigrate(&AccessLogs{})

	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	r.GET("/", index)
	r.GET("/address", addr)
	r.GET("/address/access_logs", accessLogs)

	r.Run(":8080")
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "トップページ",
	})
}

func addr(c *gin.Context) {
	var req AddrReq

	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Validation failed",
			"details": err.Error(),
		})
		return
	}

	reqPostalCode := req.PostalCode
	locations, err := getLocation(reqPostalCode)
	if err != nil {
		go saveAccessLog(reqPostalCode)
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "location not found",
			"details": err.Error(),
		})
		return
	}

	res := AddrRes{
		PostalCode: reqPostalCode,
		HitCount:   len(locations),
		Address:    fmtAddr(locations[0]),
		Distance:   GetDistance(locations[0].X, locations[0].Y),
	}

	if res.HitCount > 1 {
		commonAddr := fmtAddr(locations[0])
		maxDistance := res.Distance

		for i := 1; i < res.HitCount; i++ {
			loc := locations[i]
			commonAddr = getCommonPrefix(commonAddr, fmtAddr(loc))

			dis := GetDistance(loc.X, loc.Y)
			if dis > maxDistance {
				maxDistance = dis
			}
		}

		res.Address = commonAddr
		res.Distance = maxDistance
	}

	go saveAccessLog(reqPostalCode)
	c.JSON(http.StatusOK, res)
}

func getLocation(postalCode PostalCode) ([]Location, error) {
	url := apiUrl + string(postalCode)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var apiRes PostalApiRes

	if err := json.NewDecoder(resp.Body).Decode(&apiRes); err != nil {
		return nil, err
	}

	if len(apiRes.Response.Location) == 0 {
		return nil, errors.New("location not found")
	}

	return apiRes.Response.Location, nil
}

func fmtAddr(l Location) string {
	return l.Prefecture + l.City + l.Town
}

func getCommonPrefix(s1, s2 string) string {
	r1 := []rune(s1)
	r2 := []rune(s2)

	minLen := len(r1)
	if len(r2) < minLen {
		minLen = len(r2)
	}

	i := 0
	for i < minLen && r1[i] == r2[i] {
		i++
	}
	return string(r1[:i])
}

func GetDistance(x, y float64) float64 {
	term1 := (x - xt) * math.Cos(math.Pi*(y+yt)/360.0)
	term2 := y - yt
	val := (math.Pi * r / 180.0) * math.Sqrt((term1*term1)+(term2*term2))
	return math.Round(val*10) / 10
}

func saveAccessLog(postal PostalCode) {
	db.Create(&AccessLogs{PostalCode: postal})
}

func accessLogs(c *gin.Context) {
	var list []AccessCount

	err := db.Model(&AccessLogs{}).
		Select("postal_code, count(*) as request_count").
		Group("postal_code").
		Order("request_count DESC").
		Scan(&list).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, AccessLogsRes{AccessLogs: list})
}
