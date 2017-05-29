//TODO: Group this code with other code, For now it is here for clarity purposes
//List capability script
//TMP command: $("<div>").html( $("<div>").html("hehe") ).appendTo(".objectInArray")

var jsonProfile = JSON.parse(localStorage.jsonProfile);
var password ={
    'oldPass' : "Start123"
}

function changePassword(oldPass, newPass, newPassRepeat){
    //query to Database
    if($("#"+newPass).val()){ //old password typed correctly
        if($("#"+newPass).val() === $("#"+newPassRepeat).val()){ ///both same passwords


        }
    }else{

    }
}

function addObjectToArray(form, category, listToAppend){
    var fields = {};
    $("#"+form).find("input:not([type=button])").each(function() {
        fields[this.name] = $(this).val();
    });
    category.unshift(fields);
    updateObjectsInArray(category, listToAppend);
    localStorage.jsonProfile = JSON.stringify(jsonProfile);
}
function addValuesToArray(input, category){
    var field = $("#"+input);
    category = field.val().split(",");
    updateValuesInForms(input, category);
    localStorage.jsonProfile = JSON.stringify(jsonProfile);
}
function addSimpleValues(input, category){
    var field = $("#"+input);
    jsonProfile[input] = field.val();
    updateSimpleValuesInForms(input, jsonProfile[input]);
    localStorage.jsonProfile = JSON.stringify(jsonProfile);
}
function updateSimpleValuesInForms(input, category){
    var field = $("#"+input);
    console.log(category);
    field.val(category);
}
function updateValuesInForms(input, category){
    var field = $("#"+input);
    console.log(category);
    field.val(category.join(","));
}
function updateObjectsInArray(category, listToAppend){
    var obj;
    var line;
    var key;
    var value;
    //iterate different objects in array of f.e jobexperience
    $("#"+listToAppend).empty();
    for(var i = 0 ; i < category.length ; i++){
        console.log(i);
        //iterate keys in object (f.e. company, from, to)
        obj = $("<div>").addClass("objectInArray");
        for(var j = 0 ; j < Object.keys( category[i] ).length ; j++){
            //console.log(Object.keys(category[i])[j]);
            line = $("<div>").addClass("line");
            key = $("<span>").addClass("key").text( Object.keys(category[i])[j] +": ");
            value = $("<span>").addClass("value").text( category[i][Object.keys(category[i])[j]]);
            line.append(key, value).appendTo(obj);	//
        }
        //append the X button
        obj.append($("<div>").addClass("delete").text("X"));
        obj.appendTo("#"+listToAppend);
    }

    $('#'+listToAppend+' .delete').on('click', function(){
        //console.log( $('.objectInArray').index($(this).parent()) );
        console.log(this);
        var datajson = $(this).parents("[data-json]").data("json");
        if (datajson.indexOf('.') > -1)
        {
            jsonProfile[datajson.substring(0, datajson.indexOf("."))][datajson.substring(datajson.indexOf('.')+1, datajson.length)].splice($(this).parents(".objectInArray").index(), 1);
        }else{
            jsonProfile[datajson].splice($(this).parents(".objectInArray").index(), 1);
        }

        $(this).parent().remove();
        localStorage.jsonProfile = JSON.stringify(jsonProfile);
    });
}
//Update existing data in jsonProfile:
updateSimpleValuesInForms('name', jsonProfile.name);
updateSimpleValuesInForms('name2', jsonProfile.name2);
updateSimpleValuesInForms('dateofbirth', jsonProfile.dateofbirth);
updateSimpleValuesInForms('address', jsonProfile.address);
updateSimpleValuesInForms('address2', jsonProfile.address2);
updateSimpleValuesInForms('country', jsonProfile.country);

updateValuesInForms('skills', jsonProfile.skills);
updateValuesInForms('interests', jsonProfile.interests);
updateObjectsInArray(jsonProfile.jobexperience, "jobexperiencelist");
updateObjectsInArray(jsonProfile.schools, "schoolslist");
updateObjectsInArray(jsonProfile.acomplishments.projects, "projectslist");
updateObjectsInArray(jsonProfile.acomplishments.courses, "courseslist");
updateObjectsInArray(jsonProfile.acomplishments.certificates, "certificateslist");
updateObjectsInArray(jsonProfile.acomplishments.languages, "languageslist");
/*
 $("#saveBtn").on("click", function(){
 jsonProfile.name = $("#name").val();
 jsonProfile.name2 = $("#name2").val();
 jsonProfile.age = $("#age").val();
 jsonProfile.tel = $("#tel").val();
 jsonProfile.address = $("#address").val();
 jsonProfile.jobexperience = $("#jobexperience").val().split(",");
 jsonProfile.schools = $("#schools").val().split(",");
 jsonProfile.skills = $("#skills").val().split(",");
 jsonProfile.intrests = $("#intrests").val().split(",");



 });

 function BtnDisplay(){
 document.getElementById("searchBtn").style.display="block";}
 function BtnHide(){
 document.getElementById("searchBtn").style.display="none";}

 updateProfile(jsonProfile);

 /*var settings = {

 "crossDomain": true,
 "url": "https://reqres.in/api/users/3",
 "method": "GET",
 "headers": {
 "cache-control": "no-cache",
 "postman-token": "0554329c-c2fa-1524-9653-fc44f2a7c20c"
 }
 }

 $.ajax(settings).done(function (response) {
 console.log(response);
 });*/

var allUsers = [{
    "uid":2,
    "name": "Krzysztof",
    "name2": "Widacki",
    "email": "krzysztofwidacki@gmail.com",

},{
    "uid":1,
    "name": "Paweł",
    "name2": "Kłos",
    "email": "98asdjwofapixjc@gmail.com",

},{
    "uid":3,
    "name": "Wojciech",
    "name2": "Cejerowski",
    "email": "someCejerowski@gmail.com",

},{
    "uid":4,
    "name": "Krzysztof",
    "name2": "Orecki",
    "email": "some@gmail.com",

}
];
//var result = $.grep(allUsers, function(e){ return e.name == "Krzysztof"; });
function searchUser(value){
    var result = $.grep(allUsers, function(e){
        var isFound = ((e.name.toLowerCase() +" "+ e.name2.toLowerCase() + " " + e.email.toLowerCase()).match(new RegExp(value, 'gi')));
        return isFound;
    });
    //console.log(result);
    var list ="";
    result.forEach(function(val){
        list += "<a href='user/" + val.uid + "'>" + val.name +" "+ val.name2 + "</a>";

    });
    $("#searchResults-container").html(list);

}



$("#searchBtn").on("click", function(){
    //console.log(result);
    searchUser($("#searchInput").val());
});
$("#searchInput").on("keyup", function(){
    //console.log(result);
    searchUser($("#searchInput").val());
});
function BtnDisplay(){
    	document.getElementById("searchBtn").style.display="block";}
	function BtnHide(){
    	document.getElementById("searchBtn").style.display="none";}

    	//localStorage logic:
        console.log(localStorage.jsonProfile);