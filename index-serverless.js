const express = require("express");
const path = require("path");
var fs = require("fs");
const app = express();
const port = 3001;
app.use(express.urlencoded());
app.use(express.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index-serverless.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
