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
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/api", function (req, res) {
    let article = req.sanitize(req.params.inputUrl);
    console.log(article);

    let options = {
        mode: 'text',
        pythonPath: '/home/ian/.virtualenvs/BiaScraper/bin/python',
        scriptPath: '/home/ian/Programming/projects/BiaScraper/app/',
        args: article
    };

    pythonShell.run('exp_get_matches.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });

});

app.listen(3000, () => console.log("server has started!"));
