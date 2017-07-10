"use strict";

const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/news_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.post("/", function (req, res) {
    var article = req.body.article;
    res.send(article);
});

app.listen(3000, () => console.log("server has started!"));