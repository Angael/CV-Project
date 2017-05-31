var express    = require('express');        // call express
var fs = require('fs');
var app        = express();
var bodyParser = require('body-parser');
// var bodyParser = require('body-parser');
// var Bear     = require('./app/models/bear');
//
//var http = require('http');
// var url = require('url');
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
    .post(function(req, res) {
        console.log("post");
        console.log(req.params);
        try {
            var json = JSON.parse(data);
            console.log("yeah");
        } catch (e) {
            console.log("oh no its not json");
            // not json
        }
        //res.status(666).send
        //res.send("send all users in json");
    })

    .get(function(req, res) {
        console.log("get many");
        fs.readFile('allUsers.json', 'utf8',  function(err, data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            //console.log(data);
            res.end();
        });
        //res.send("send all users in json");
    });

router.route('/users/:user_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log("get single");
        fs.readFile('allUsers.json', 'utf8',  function(err, data) {
            dataParsed = JSON.parse(data);
            if(getUser(dataParsed, req.params.user_id) != -1){ //user is found in array

                response = JSON.stringify(dataParsed[getUser(dataParsed, req.params.user_id)]);

            }else{
                response = JSON.stringify({"error":"no user found with uid =="+req.params.user_id})

            }

            //console.log(getUser(dataParsed, req.params.user_id));
            //console.log(response);

            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.write(response);
            res.end();
        });
    });

function getUser(userList,hisId){
    for (var i = 0; i < userList.length; i++) {
        if(userList[i].uid==hisId){
            return i; //return index of user with uid == hisId
        }
    }
    return -1;
}

routerHome.route("/").get( function(req, res){
    console.log("home directory");
    fs.readFile('./public/login.html', function (err, html) {
        if (err) {
            throw err;
        }
        http.createServer(function(request, response) {
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }).listen(8000);
    });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/', routerHome);
app.use(express.static('public')); // Allows for files in public to be accessible like so: "localhost:4000/login.html"

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);