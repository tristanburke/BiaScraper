"use strict";

const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const request = require("request");
const pythonShell = require("python-shell");
const openscraping = require("openscraping");
const unfluff = require("unfluff");

// CREATE APP
var express = require('express');
var app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/news_app");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get('/find', function(res, req) {
    console.log(req)
    let article = req.query.input_url;
    console.log(article)
});


/* ==========================================================
 serve the static index.html from the public folder
 ============================================================ */

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});