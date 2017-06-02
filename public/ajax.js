var allUsers;
var ourRequest = new XMLHttpRequest();
	var url = "/api/users";
	ourRequest.open('GET', url);
	ourRequest.onload = function() {	
	allUsers = JSON.parse(ourRequest.responseText);
	console.log(allUsers[1])
};
ourRequest.send();

function ajaxLoginPost(){
    var login = $("#signIn .email").val();
    var pass = $("#signIn .pass").val();
    var data = {
        "login":login,
        "pass":pass
    };

    $.ajax({
        "url": "/backend/login",
        "contentType": "application/json; charset=utf-8",
        "method": "POST",
        "data": JSON.stringify(data),
        "headers": {
            "cache-control": "no-cache"
        },
        "success":function(data){
            console.log("Success ");
            //$("body").append(JSON.stringify(data));
            window.location.replace("profile.html");
        },
        "error":function(data){
            console.log("Error ");
            //$("body").append(JSON.stringify(data));
            console.log(data);
        }

    });
}

function ajaxAuth(success, error){ //returns your profile if your cookie is ok
    $.ajax({
        "url": "/backend/auth",
        "contentType": "application/json; charset=utf-8",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        },
        "success":success, //potential bugs
        "error":error

    });


}