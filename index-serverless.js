const express = require("express");
const path = require("path");
var fs = require("fs");
const app = express();
const port = 3001;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index-serverless.html"));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
