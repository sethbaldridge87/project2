$.get("/api/all", function(data) {
      console.log("Here's the data:");
      console.log(data);

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("user");
      row.append("<h3 data-id=" + data[i].id + ">User:</h3>");
      row.append("<p>Name: " + data[i].name + "</p>");
      row.append("<p>Age: " + data[i].age + "</p>");
      row.append("<p>Height: " + data[i].height + "</p>");
      row.append("<p>Weight: " + data[i].weight + "</p>");
      row.append("<span class='delete_user'>x</span>");
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
        console.log(data);
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
});
