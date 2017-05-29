
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
            {"company":"Acaisoft", "from":"12-12-2017", "to":"1-1-2018"},
            {"company":"Google", "from":"12-12-2017", "to":"1-1-2018"},
            {"company":"Microsoft", "from":"12-12-2017", "to":"1-1-2018"}
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
        "acomplishments":{
            "interests": [
                "Films", "Bikes"
            ],
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
        for (var i = 0, len = json.jobexperience.length; i < len; i++){
            $("#jobexperience").append( json.jobexperience[i]['company'] + ", from " + json.jobexperience[i]["from"] + " to " + json.schools[i]['to'] +"<br>" );
        }
        for (var i = 0, len = json.schools.length; i < len; i++){
            $("#schools").append( json.schools[i]['name'] + ", from " + json.schools[i]["from"] + " to " + json.schools[i]['to'] +"<br>" );
        }
        $("#skills").text(json.skills);
        $("#interests").text(json.acomplishments.interests.join(", "));
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

    updateProfile(jsonProfile);