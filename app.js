var express    = require('express');        // call express
var app        = express();                 // define our app using express

// var bodyParser = require('body-parser');
// var Bear     = require('./app/models/bear');
//
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
//
// http.createServer(function (req, res) {
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, function(err, data) {
//         if (err) {
//             res.writeHead(404, {});
//             return res.end("404 Not Found");
//         }
//         res.writeHead(200, {});
//         res.write(data);
//         return res.end();
//     });
// }).listen(1234);

// configure app to use bodyParser()
// this will let us get the data from a POST



var port = process.env.PORT || 4000;        // set our port


// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
var routerHome = express.Router();

// This fires whenever there is a request - middleware to use for all requests
var timesUsedSinceServerStart =0;
router.use(function(req, res, next) {
    timesUsedSinceServerStart++; // TODO delete
    // do logging
    console.log(timesUsedSinceServerStart + " Something went through api router!");
    next(); // make sure we go to the next routes and don't stop here
});

    //When user sees /api/ page without arguments
router.get('/', function(req, res) {
    res.json([{ message: 'Hooray! Welcome to our api!' },
        {"testArg1":"something asdf"}]);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

router.route('/users')

// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        console.log("post");
        //res.status(666).send
        //res.send("send all users in json");
    })

    .get(function(req, res) {
        console.log("get many");
        res.send("send all users in json");
    });

router.route('/users/:user_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log("get single");
    });

app.use('/api', router);
app.use('/', router);
app.use(express.static('public')); // Allows for files in public to be accessible like so: "localhost:4000/login.html"

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);