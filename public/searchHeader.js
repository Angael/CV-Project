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

//var all = JSON.parse(localStorage.allUsers);
var all = JSON.parse(all);
function searchUser(value){
    var result = $.grep(all, function(e){
        var isFound = ((e.name.toLowerCase() +" "+ e.name2.toLowerCase() + " " + e.email.toLowerCase()).match(new RegExp(value, 'gi')));
        return isFound;
    });
    //console.log(result);
    var list ="";
    result.forEach(function(val){
        list += "<a href='user.html?id=" + val.uid + "'>" + val.name +" "+ val.name2 + "</a>";

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