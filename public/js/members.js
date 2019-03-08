$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-email").text(data.email);
    console.log(data.email)
  });
  $.get("/api/user_data", function(data) {
    console.log("Here's the data:");
    console.log(data);
  });
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);

  
  });
  $.get("/api/user_data").then(function(data) {
    $(".member-weight").text(data.weight);
  });
  $.get("/api/user_data").then(function(data) {
    $(".member-height").text(data.height);
  });
  $.get("/api/user_data").then(function(data) {
    $(".member-age").text(data.age);
  });
 
  $(document).on("click", ".button-edit", handlePostEdit);
  function handlePostEdit() {
    $.get("/api/user_data").then(function(data){
    window.location.href = "/cms?user_email=" + data.email;
 
 
  });
  
  }
  $(".refresh").click(function (){
    window.location.reload(true);
})
});
