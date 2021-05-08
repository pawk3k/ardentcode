const express = require("express");
const path = require("path");
var fs = require("fs");

const app = express();
const port = 3002;

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
  res.setHeader("Access-Control-Allow-Methods", " POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/save", (request, response) => {
  const { fileName, data } = request.body.file;
  console.log(fileName);
  fs.writeFile(
    `${__dirname}/text-jsons/${fileName}`,
    JSON.stringify({ data: data }),
    { flag: "w" },
    (err, data) => (err == true ? console.log(err) : console.log(data))
  );
  response.send(200, { message: "ok" });

  console.log(data);
  return response;
  console.log("submited");
});

app.post("/load", (request, response) => {
  console.log(request.body.name);
  console.log(__dirname + "/text-jsons/");
  fs.readFile(
    `${__dirname}/text-jsons/${request.body.name}`,
    function (err, data) {
      if (err) throw err;
      const stringData = data.toString("utf-8");
      const jsonData = JSON.parse(stringData);
      const regex = /(\\n|\s{2,})/g;
      response.send(200, jsonData.data.trim().replace(regex, " "));
    }
  );
  console.log("submited");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
