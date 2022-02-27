package main

import (
  "os"
  "context"
  "github.com/go-pg/pg/v10"
  log "github.com/sirupsen/logrus"

  // "net/http"
  //"github.com/gin-gonic/gin"
)

func main() {
  log.SetFormatter(&log.JSONFormatter{})
  file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
  if err != nil {
    log.Fatal(err)
  }

  log.SetOutput(file)
  contextLogger := log.WithFields(log.Fields{
    "common": "Test",
  })

  db := pg.Connect(&pg.Options{
    Addr:     ":5432",
    User:     os.Getenv("POSTGRES_USERNAME"),
    Password: os.Getenv("POSTGRES_PASSWORD"),
    Database: os.Getenv("POSTGRES_DB"),
  })

  ctx := context.Background()
  if err := db.Ping(ctx); err != nil {
      contextLogger.Error(err)
      panic(err)
  } 
}
