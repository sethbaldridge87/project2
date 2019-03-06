$.get("/api/all", function(data) {
      console.log("Here's the data:");
      console.log(data);

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {
      var row = $("<div class='row'>");
      row.addClass("user");
      row.append("<h3 data-id=" + data[i].id + "></h3>");
      row.append("<p>Name: " + data[i].name + "</p>");
      // row.append("<p>Age: " + data[i].age + "</p>");
      // row.append("<p>Height: " + data[i].height + "</p>");
      // row.append("<p>Weight: " + data[i].weight + "</p>");
      row.append("<a href='user?user_id=" + data[i].id + "'><button class='btn'>Select User</button></a><br><br>");
      row.append("<button class='delete_user btn'>Delete User</button>");
      row.append("<hr>");
      $("#users").prepend(row);
    }
  }
});
$(document).ready(function(){
  $('#submit_user').on('click', function(){
    event.preventDefault();
    var newUser = {
      name: $('#UName').val().trim(),
      age: $('#UAge').val().trim(),
      weight: $('#UWeight').val().trim(),
      height: $('#UHeight').val().trim(),
      gender: $('#UGender').val().trim()
    };
    console.log(newUser);
    $.post("/api/new", newUser)
      .then(function(data){
        location.reload();
      })
  });
  $('.delete_user').click(function(){
    var deletedID = $(this).closest('div').find('h3').attr('data-id');
    deleteUser(deletedID);
  });
  function deleteUser(user){
    alert(user);
    $.ajax({
      method: "DELETE",
      url: "/api/delete/" + user
    })
    .then(function() {
      
    });
  }
  var url = window.location.href;   
  console.log(url);
  var target = url.substr(url.indexOf('_id=') + 4);
  console.log(target);
  $.ajax({
    method: "GET",
    url: "/api/single/" + target
  })
  .then(function(data){
      var row = $("<div class='row'>");
      row.addClass("user");
      row.append("<h3 data-id=" + data.id + ">User:</h3>");
      row.append("<p>Name: " + data.name + "</p>");
      row.append("<p>Age: " + data.age + "</p>");
      row.append("<p>Height: " + data.height + "</p>");
      row.append("<p>Weight: " + data.weight + "</p>");
      row.append("<button class='delete_user btn'>Delete User</button>");
      row.append("<hr>");
      $("#single_user").append(row);
  });
  
});
