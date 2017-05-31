
var a = allUsers;
var b = JSON.parse(a);
var string ="";

for (var i = 0, len = b.length; i < len; i++)
{

    string += ("<tr>"+"<td>"+ b[i].uid +"</td>"+"<td><a href='user.html?id="+b[i].uid+"'>"+ b[i].name +"</a></td>"+"<td>"+ b[i].name2 +"</td>"+"<td>"+ b[i].email +"</td>"+"</tr>");
    console.log(string);
    /*document.write(b[i].uid + b[i].name + b[i].name2 + b[i].email +"</br>");*/
};
document.getElementById("users-container").innerHTML=string;



function searchUser(value){
    var result = $.grep(allUsers, function(e){
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