function goToProfile(data){
    console.log("Success ");
    //$("body").append(JSON.stringify(data));
    console.log(data);
    window.location.replace("profile.html"); //automatic redirect cause user is already logged in
}
function nothing(data){
    console.log("user isn't already logged in, must do it now ");
    //$("body").append(JSON.stringify(data));
    console.log(data);
}
ajaxAuth(goToProfile, nothing);

	//Hard coded logins
  

    //When user clicks submit in login pane
	//Try to log in:
    $("#signIn .submit").on("click", function(){
        //Check if any field is empty, color it red
        if($("#signIn .email").val()==="" || $("#signIn .pass").val()==="") {
            if ($("#signIn .email").val() === "") {
                $("#signIn .email").css("outline", "solid 1px red");
            }
            if ($("#signIn .pass").val() === "") {
                $("#signIn .pass").css("outline", "solid 1px red");
            }
            return;
        }

        ajaxLoginPost();

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
        // for (var i = 0, len = allUsers.length; i < len; i++) {
        //     var emailExists = false;
        //     if(allUsers[i].email.toLowerCase() === $("#signUp .email").val().toLowerCase() ){
        //         emailExists = true;
        //         alert("Email exists");
        //         return;
        //     }
        // }

        // if($("#signUp .pass").val() !== $("#signUp .pass2").val() ){
        //     alert("Passwords are different!");
        // }else{
        //
        //     var currentAllUsers = JSON.parse(allUsers);
        //     var accountObject = {
        //         "uid": (currentAllUsers[currentAllUsers.length-1]["uid"]+1),
        //         "name": $("#signUp .name").val(),
        //         "name2": $("#signUp .name2").val(),
        //         "email": $("#signUp .email").val(),
        //         "pass": $("#signUp .pass").val()
        //     };
        //     currentAllUsers.push(accountObject);
        //     allUsers = JSON.stringify(currentAllUsers);
        //     allUsers = currentAllUsers;
        //     alert("Account created!");
        // }
    });


    //local storage scripts:
    if(localStorage.jsonProfile == undefined){
        localStorage.jsonProfile = JSON.stringify();
    }
	
	if(allUsers == undefined){ // type localStorage.clean() to reset page to defualts:
        allUsers = JSON.stringify();
	}
   


    //localStorage logic:
    console.log(localStorage.jsonProfile);

