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
        "crossDomain": true,
        "url": "http://localhost:4000/backend/login",
        "contentType": "application/json; charset=utf-8",
        "method": "POST",
        "data": JSON.stringify(data),
        "headers": {
            "cache-control": "no-cache"
        },
        "success":function(data){
            console.log("Success ");
            $("body").append("asdasd" + JSON.stringify(data));
            window.location.replace("profile.html");
        },
        "error":function(data){
            console.log("Error ");
            $("body").append("asdasd" + data);
            console.log(data);
        }

    });
}

function setWhoIAm(id){

	//document.cookie = id;
}