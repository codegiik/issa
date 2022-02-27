package main

import (
  "os"
  log "github.com/sirupsen/logrus"
)

func main() {
  log.SetFormatter(&log.JSONFormatter{})
  file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
  if err != nil {
    log.Fatal(err)
  }

  log.SetOutput(file)
}
