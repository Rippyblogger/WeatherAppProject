// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening)

function listening() {
    console.log(`App server is up and running on localhost: port ${port}`);
};

//GET Route
app.get('/weather', getData);

function getData(request, response) {
    //console.log(request);
    response.send(projectData);
}

//POST Route
app.post("/getData", postData);


function postData(req, res) {

    console.log(req.body);
    projectData.push(req.body);
    console.log(projectData);
    //projectData = req.body;
    //console.log("recieved POST request");
    //console.log(projectData);
    res.send('POST received');
}