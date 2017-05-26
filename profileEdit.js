//TODO: Group this code with other code, For now it is here for clarity purposes
//List capability script
//TMP command: $("<div>").html( $("<div>").html("hehe") ).appendTo(".objectInArray")

var jsonProfile = {
    "uid":2,
    "name": "Krzysztof",
    "name2": "Widacki",
    "dateofbirth": "19-04-1998",
    "birthofaccount":"21-04-1998",
    "email": "krzysztofwidacki@gmail.com",
    "tel": "123456789",
    "address": "Słoneczna 15",
    "address2": "Warsaw 02-540",
    "country":"Poland",
    "jobexperience": [
        {"company":"Acaisoft",
            "from":"12-12-2017",
            "to":"1-1-2018"
        },
        {"company":"Google",
            "from":"12-12-2017",
            "to":"1-1-2018"
        },
        {"company":"Microsoft",
            "from":"12-12-2017",
            "to":"1-1-2018"
        }
    ],
    "schools": [
        {"name":"Wiśniowa",
            "from":"1-12-1212",
            "to":"2-12-1212"},
        {"name":"Staffa nr 1",
            "from":"1-12-1212",
            "to":"2-12-1212"},
        {"name":"Generic School 3",
            "from":"2-11-1318",
            "to":"2-1-1290"}
    ],
    "skills": [
        "breathing", "holding two handed swords with one hand"
    ],
    "interests": [
        "Films", "Bikes"
    ],
    "acomplishments":{
        "projects":[
            {
                "name":"google self driving cars",
                "ended":"1-1-2012"
            },
            {
                "name":"cloudlanes",
                "ended":"3-2-2013"
            }
        ],
        "courses":[
            {
                "name":"ccna1course",
                "ended":"1-1-2017"
            },
            {
                "name":"ccna2course",
                "ended":"2-2-2017"
            }
        ],
        "certificates":[
            {
                "name":"ccna1",
                "expirationDate":"1-1-2017"
            },
            {
                "name":"ccna2",
                "expirationDate":"2-2-2017"
            }
        ],
        "languages": [{
            "language": "english",
            "proficiency": "master"
        },
            {
                "language": "german",
                "proficiency": "beginner"
            }
        ]
    },
    "friends":[{
        "uid":1,
        "name": "Paweł",
        "name2": "Kłos"
    },
        {
            "uid":3,
            "name": "Wojciech",
            "name2": "Cejerowski"
        }]
};
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
}
function addValuesToArray(input, category){
    var field = $("#"+input);
    category = field.val().split(",");
    updateValuesInForms(input, category);
}
function addSimpleValues(input, category){
    var field = $("#"+input);
    jsonProfile[input] = field.val();
    updateSimpleValuesInForms(input, jsonProfile[input]);
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
            jsonProfile[datajson.substring(0, datajson.indexOf("."))][datajson.substring(datajson.indexOf('.')+1, datajson.length)].splice($(this).parents(".objectInArray").index($(this).parent()), 1);
        }else{
            jsonProfile[datajson].splice($(this).parents(".objectInArray").index($(this).parent()), 1);
        }

        $(this).parent().remove();
    });
}
//Update existing data in jsonProfile:
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
