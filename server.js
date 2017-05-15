var express = require("express");
var path = require("path");

var app = express();

app.use("/css", express.static( __dirname +"/app/css"));
app.use("/fonts", express.static(__dirname + "/app/fonts"));
app.use("/img", express.static(__dirname + "/app/img"));
app.use("/js", express.static(__dirname + "/app/js"));
app.use("/libs", express.static(__dirname + "/app/libs"));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.post("/create-account", function (req, res) {
    res.sendStatus(200);
});

app.listen(8000, function () {
    console.log("server.js successfully running!");
});