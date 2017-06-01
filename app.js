var express    = require('express');        // call express
var fs = require('fs');
var app        = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var port = process.env.PORT || 4000;        // set our port


// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
var routerHome = express.Router();
var backendRouter = express.Router();

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
    .post(function(req, res) { //data is object already
        console.log("post");
        //console.log(req.body);
        //console.log(req.headers);
        // console.log(req.body);

        var data = req.body;

        // try {
        //     console.log(JSON.parse(req.body));
        //     console.log("yeah");
        // } catch (e) {
        //     console.log("oh no its not json");
        //     // not json
        // }
        //res.status(666).send
        //res.send("send all users in json");
        data.status = "success";
        res.cookie('acaisoft', 'super random value');
        res.header('acaisoft-token', 'secret');
        res.send(200, data);
    })

    .get(function(req, res) {
        //console.log(req.headers);

        console.log("get many users");
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
        console.log("get single user");
        fs.readFile('allUsers.json', 'utf8',  function(err, data) {
            dataParsed = JSON.parse(data);
            if(getUser(dataParsed, req.params.user_id) != -1){ //user is found in array
                response = JSON.stringify(dataParsed[getUser(dataParsed, req.params.user_id)]);
            }else{
                response = JSON.stringify({"error":"no user found with uid =="+req.params.user_id})
            }

            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.write(response);
            res.end();
        });
    });

function getUser(userList, hisId){
    for (var i = 0; i < userList.length; i++) {
        if(userList[i].uid==hisId){
            return i; //return index of user with uid == hisId
        }
    }
    return -1;
}
function auth(userList, req){
    //get cookie
    if(req.cookies['SUPER-SECRET-TOKEN-CV']!== undefined){
        var secret_cookie = req.cookies['SUPER-SECRET-TOKEN-CV'];
        for (var i = 0; i < userList.length; i++) {
            if(userList[i] == secret_cookie){
                //cool we found the uid
                return true;
            }
        }
        return false;
    }
}

routerHome.use( function(req, res, next){
    console.log("routerHome always calls me");
    var file = fs.readFileSync('allUsers.json', 'utf8')
    auth(file, req);
    next();
});

routerHome.route("/").get( function(req, res){
    console.log("home directory");
    fs.readFile('./public/login.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
});

backendRouter.route('/login')
    .post(function(req, res) { //data is object already
        console.log("somebody tries to login");
        var postData = req.body;
        var foundUser;
        var file = fs.readFileSync('allUsers.json', 'utf8')
        var dataParsed = JSON.parse(file);
        //
        // //Check cookies
        // console.log("COOKIES FROM CV YEAAAAAHHHHHHH");
        // console.log(req.cookies);

        //get user with this email
        foundUser = dataParsed.filter(function(i){
            return (i.email == postData.login) ;
        });
        //check if password matches
        if(foundUser[0].pass == postData.pass){
            res.cookie('SUPER-SECRET-TOKEN-CV', foundUser[0].uid); // for now a simple uid, totally hackable
        }else{
        }
        //res.header('acaisoft-token', 'secret'); TODO: cool secret way of authorizing, using js tho
        res.status(200).end();


    });

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/backend', backendRouter);
app.use('/api', router);
app.use('/', routerHome);
app.use(express.static('public')); // Allows for files in public to be accessible like so: "localhost:4000/login.html"

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);