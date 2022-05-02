// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const dotenv = require("dotenv");
dotenv.config();
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("dist"));

const apiKey = {
    key: `${process.env.API_KEY}`
}

const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log("Port = " + port);
})

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})

app.get("/apikey", function(req,res){
    res.json(apiKey);
})

app.get("/getdata", function (req, res){
    console.log (projectData);
    res.json(projectData);
});

app.post("/data", analyze);

function analyze(req, res) {

    projectData.score_tag = req.body.score_tag,
    projectData.agreement = req.body.agreement,
    projectData.subjectivity = req.body.subjectivity,
    projectData.confidence = req.body.confidence,
    projectData.irony = req.body.irony

    res.send(projectData);
}
