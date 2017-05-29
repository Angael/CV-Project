
	//Hard coded logins
    var allUsers;

    //When user clicks submit in login pane
	//Try to log in:
    $("#signIn .submit").on("click", function(){
        //Validate both fields
        var passIndex =-1;
        for (var i = 0, len = allUsers.length; i < len; i++) {
            //Check if any field is empty, color it red
            if($("#signIn .email").val()==="" || $("#signIn .pass").val()==="" || $("#signIn .pass2").val()===""){
                if($("#signIn .email").val()===""){
                    $("#signIn .email").css("outline", "solid 1px red");
                }
                if($("#signIn .pass").val()===""){
                    $("#signIn .pass").css("outline", "solid 1px red");
                }
                return;
            }

            var loginCorrect = false;
            //Check if login exists
            if(allUsers[i].email.toLowerCase() === $("#signIn .email").val().toLowerCase() ){
  				loginCorrect = true;
                passIndex = i;
				break;
			}
        }
        if(passIndex>=0 && passIndex < allUsers.length) {
            if (allUsers[passIndex].pass === $("#signIn .pass").val()) {
                alert("Success!");
                localStorage.jsonProfile = JSON.stringify(allUsers[passIndex]);
                window.location.replace("profile.html");
            }else{
                alert("Fail! Invalid Credentials");
            }
        }else{
            alert("Fail! No such user found");
		}
	});



	//On register click
	//Try to register user
	//TODO: Validate empty, invalid emails, empty passwords, have some requirements
    $("#signUp .submit").on("click", function(){
        //Check if any field is empty, color it red
        if($("#signUp .email").val()==="" || $("#signUp .pass").val()==="" || $("#signUp .pass2").val()===""){
            if($("#signUp .email").val()===""){
                $("#signUp .email").css("outline", "solid 1px red");
            }
            if($("#signUp .pass").val()===""){
                $("#signUp .pass").css("outline", "solid 1px red");
            }
            if($("#signUp .pass2").val()===""){
                $("#signUp .pass2").css("outline", "solid 1px red");
            }
            return;
        }
        for (var i = 0, len = allUsers.length; i < len; i++) {
            var emailExists = false;
            if(allUsers[i].email.toLowerCase() === $("#signUp .email").val().toLowerCase() ){
                emailExists = true;
                alert("Email exists");
                return;
            }
        }

        if($("#signUp .pass").val() !== $("#signUp .pass2").val() ){
            alert("Passwords are different!");
        }else{

            var currentAllUsers = JSON.parse(localStorage.allUsers);
            var accountObject = {
                "uid": (currentAllUsers[currentAllUsers.length-1]["uid"]+1),
                "name": $("#signUp .name").val(),
                "name2": $("#signUp .name2").val(),
                "email": $("#signUp .email").val(),
                "pass": $("#signUp .pass").val()
            };
            currentAllUsers.push(accountObject);
            localStorage.allUsers = JSON.stringify(currentAllUsers);
            allUsers = currentAllUsers;
            alert("Account created!");
        }
    });


    //local storage scripts:
    if(localStorage.jsonProfile == undefined){
        localStorage.jsonProfile = JSON.stringify({
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
        });
    }
	
	if(localStorage.allUsers == undefined){ // type localStorage.clean() to reset page to defualts:
        localStorage.allUsers = JSON.stringify([{
            "uid":2,
            "name": "Krzysztof",
            "name2": "Widacki",
            "pass":"Start123",
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
        },{
            "uid":3,
            "name": "Paweł",
            "name2": "Kłos",
            "pass":"Start123",
            "dateofbirth": "11-01-1118",
            "birthofaccount":"22-02-1222",
            "email": "pawełkłos@gmail.com",
            "tel": "987654321",
            "address": "Słoneczna123 15",
            "address2": "Poznań 02-540",
            "country":"Mars",
            "jobexperience": [
                {"company":"McDonald",
                    "from":"12-12-2017",
                    "to":"1-1-2018"
                },
                {"company":"Apple",
                    "from":"12-12-2017",
                    "to":"1-1-2018"
                },
                {"company":"Pear",
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
                "uid":2,
                "name": "Krzysztof",
                "name2": "Widacki"
            },
                {
                    "uid":4,
                    "name": "Wojciech",
                    "name2": "Cejerowski"
                }]
        },{
            "uid":4,
            "name": "Wojciech",
            "name2": "Cejerowski",
            "pass":"Start123",
            "dateofbirth": "19-04-1998",
            "birthofaccount":"21-04-1998",
            "email": "wojciechcejerowski@gmail.com",
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
        }]);
	}
    allUsers = JSON.parse(localStorage.allUsers);



    //localStorage logic:
    console.log(localStorage.jsonProfile);

