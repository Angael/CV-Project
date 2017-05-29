
var all = JSON.parse(localStorage.allUsers);
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