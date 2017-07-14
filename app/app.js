"use strict";

const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const request = require("request");
const pythonShell = require("python-shell");
const openscraping = require("openscraping");
const unfluff = require("unfluff");

const app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/news_app");
app.set("view engine", "html");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Initialize Main Angular App
var mainApp = angular.module("mainApp", []);


app.listen(3000, () => console.log("server has started!"));