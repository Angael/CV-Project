var allUsers;
var ourRequest = new XMLHttpRequest();
	var url = "allUsers.json";
	ourRequest.open('GET', url);
	ourRequest.onload = function() {	
	allUsers = JSON.parse(ourRequest.responseText);
	console.log(allUsers[1])
};
ourRequest.send();