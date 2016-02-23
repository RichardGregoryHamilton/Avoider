
var Firebase = require("firebase");

var express = require("express");
var app = express();
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');

app.set("port", process.env.PORT || 3000);

var views = __dirname + "/views";
var partials = views + "/partials";
var scripts = __dirname + "/scripts";
var vendor = scripts + "/vendor";

app.use(express.static(__dirname + '/images'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/views/partials/header", function(req, res) {
    res.sendFile(partials + "/header.html");
});

app.get("/views/partials/footer", function(req, res) {
    res.sendFile(partials + "/footer.html");
});

app.get("/views/help", function(req, res) {
    res.sendFile(views + "/help.html");
});

app.get("/views/faq", function(req, res) {
    res.sendFile(views + "/faq.html");
});

app.get("/views/achievements", function(req, res) {
    res.sendFile(views + "/achievements.html");
});

app.get("/views/scores", function(req, res) {
    res.sendFile(views + "/scores.html");
});

app.get("/views/related", function(req, res) {
    res.sendFile(views + "/related.html");
});

app.get("/views/shop", function(req, res) {
    res.sendFile(views + "/shop.html");
});

app.get("*/images/avatar.png", function(req, res) {
    res.sendFile(__dirname + "/images/avatar.png");
});

app.get("*/images/enemy.png", function(req, res) {
    res.sendFile(__dirname + "/images/enemy.png");
});

app.get("*/bootstrap.min.css", function(req,res) {
    res.sendFile(__dirname + "/styles/bootstrap.min.css");
});

app.get("*/styles.css", function(req,res) {
    res.sendFile(__dirname + "/styles/styles.css");
});

app.get("/scripts/app.js", function(req, res) {
    res.sendFile(scripts + "/app.js");
});

app.get("/scripts/data.js", function(req, res) {
    res.sendFile(scripts + "/data.js");
});

app.get("/scripts/main.js", function(req, res) {
    res.sendFile(scripts + "/main.js");
});

app.get("/scripts/pong.js", function(req, res) {
    res.sendFile(scripts + "/pong.js");
});

app.get("/scripts/services/game.js", function(req, res) {
    res.sendFile(scripts + "/services/game.js");
});

app.get("/scripts/controllers/navController.js", function(req, res) {
    res.sendFile(scripts + "/controllers/navController.js");
});

app.get("/scripts/controllers/gameController.js", function(req, res) {
    res.sendFile(scripts + "/controllers/gameController.js");
});

app.get("/scripts/controllers/scoresController.js", function(req, res) {
    res.sendFile(scripts + "/controllers/scoresController.js");
});

app.get("/scripts/controllers/achievementsController.js", function(req, res) {
    res.sendFile(scripts + "/controllers/achievementsController.js");
});

app.get("/scripts/controllers/shopController.js", function(req, res) {
    res.sendFile(scripts + "/controllers/shopController.js");
});

app.get("/scripts/vendor/lodash.js", function(req, res) {
    res.sendFile(vendor + "/lodash.js");
});

app.get("/scripts/vendor/thenby.min.js", function(req, res) {
    res.sendFile(vendor + "/thenby.min.js");
});

app.get("/scripts/vendor/jquery.min.js", function(req, res) {
    res.sendFile(vendor + "/jquery.min.js");
});

app.get("/scripts/vendor/angular.min.js", function(req, res) {
    res.sendFile(vendor + "/angular.min.js");
});

app.get("/scripts/vendor/jcanvas.min.js", function(req, res) {
    res.sendFile(vendor + "/jcanvas.min.js");
});

app.listen(app.get("port"), function() {
    console.log("Server started: http://localhost:" + app.get("port") + "/");
});
