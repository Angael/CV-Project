 var all = "";
 
 $.ajax({
    "crossDomain": true,
    "url": "http://localhost:4000/api/",
    "method": "GET",
    "headers": {
        "cache-control": "no-cache"
    },
    "success":function(data){
        console.log("Success ");
        console.log(data);
        all = data;
    },
    "error":function(data){
        console.log("Error ");
        console.log(data);
    }

});


//var jsonProfile = JSON.parse(localStorage.jsonProfile);
var jsonProfile = JSON.parse(all);
//Get GET parameter of user
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
function _calculateAge(birthday) { // birthday is a dd-mm-yyyy string
    var from = birthday.split("-");
    birthday = new Date(from[2], from[1] - 1, from[0]);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function updateProfile( json){
    $("#name").text(json.name);
    $("#name2").text(json.name2);
    $("#dateofbirth").text(json.dateofbirth + " (" + _calculateAge(json.dateofbirth)  + " years old)");
    $("#tel").text(json.tel);
    $("#email").text(json.email);
    $("#address").text(json.address);
    $("#address2").text(json.address2);
    $("#country").text(json.country);
    for (var i = 0, len = json.jobexperience.length; i < len; i++){
        $("#jobexperience").append( json.jobexperience[i]['company'] + ", from " + json.jobexperience[i]["from"] + " to " + json.schools[i]['to'] +"<br>" );
    }
    for (var i = 0, len = json.schools.length; i < len; i++){
        $("#schools").append( json.schools[i]['name'] + ", from " + json.schools[i]["from"] + " to " + json.schools[i]['to'] +"<br>" );
    }
    $("#skills").text(json.skills);
    $("#interests").text(json.interests);
    for (var i = 0, len = json.acomplishments.projects.length; i < len; i++){
        $("#projects").append( json.acomplishments.projects[i]['name'] + ", project that ended on: " + json.acomplishments.projects[i]["ended"] + "<br>" );
    }
    for (var i = 0, len = json.acomplishments.languages.length; i < len; i++){
        $("#languages").append( json.acomplishments.languages[i]['language'] + " with proficiency: " + json.acomplishments.languages[i]["proficiency"] + "<br>" );
    }
    for (var i = 0, len = json.acomplishments.courses.length; i < len; i++){
        $("#courses").append( json.acomplishments.courses[i]['name'] + " that ended on: " + json.acomplishments.courses[i]["ended"] + "<br>" );
    }
    for (var i = 0, len = json.acomplishments.certificates.length; i < len; i++){
        $("#certificates").append( json.acomplishments.certificates[i]['name'] + " that will expire in: " +json.acomplishments.certificates[i]["expirationDate"] + "<br>" );
    }
}


function getUser(){

    for (var i = 0; i < allUsers.length; i++) {
        console.log(findGetParameter('id'));
        //Check if any field is empty, color it red
        if(allUsers[i].uid==parseInt(findGetParameter('id'))){
            return i;
        }
    }
}
console.log(getUser() + "hehe");
// console.log(findGetParameter('id'));
updateProfile(allUsers[getUser()]);





$("#searchBtn").on("click", function(){
    //console.log(result);
    searchUser($("#searchInput").val());
});
$("#searchInput").on("keyup", function(){
    //console.log(result);
    searchUser($("#searchInput").val());
});