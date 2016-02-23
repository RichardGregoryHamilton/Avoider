
var Firebase = require("firebase");

var express = require("express");
var app = express();
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');

//var configDB = require('./config/db.js');

app.set("port", process.env.PORT || 3000);

/*require('./config/passport')(passport);

var LocalStrategy = require('passport-local').Strategy;

app.use(function (req, res, next) {
    if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'mysecret',
                  saveUninitialized: true,
                  resave: true}));
                  

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var routes = require('./routes')(app, passport);*/

var views = __dirname + "/views";
var partials = views + "/partials";
var scripts = __dirname + "/scripts";

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

app.get("*/images/skeleton.png", function(req, res) {
    res.sendFile(__dirname + "/images/skeleton.png");
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

app.get("/scripts/lodash.js", function(req, res) {
    res.sendFile(scripts + "/lodash.js");
});

app.get("/scripts/thenby.min.js", function(req, res) {
    res.sendFile(scripts + "/thenby.min.js");
});

app.get("/scripts/jquery.min.js", function(req, res) {
    res.sendFile(scripts + "/jquery.min.js");
});

app.get("/scripts/angular.min.js", function(req, res) {
    res.sendFile(scripts + "/angular.min.js");
});

app.get("/scripts/jcanvas.min.js", function(req, res) {
    res.sendFile(scripts + "/jcanvas.min.js");
});

/*app.get("/images/avoider.png", function(req, res) {
    res.sendFile(images + "/avoider.png");
});

app.get("/images/enemy.png", function(req, res) {
    res.sendFile(images + "/enemy.png");
});*/

app.listen(app.get("port"), function() {
    console.log("Server started: http://localhost:" + app.get("port") + "/");
});
