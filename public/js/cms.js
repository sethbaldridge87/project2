$(document).ready(function() {

    var url = window.location.search;
    var userEmail;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
  //  if (url.indexOf("?user_email=") !== -1) {
   //   userEmail = url.split("=")[1];
  //    getUserData(userEmail);
  //    console.log(userEmail)
 //   }


    var nameInput = $("#name");
    var ageInput = $("#age");
    var weightInput = $("#weight");
    var heightInput = $("#height");
    var genderInput = $("#gender");
  
  var cmsForm = $("#cms");
 
 
  // Adding an event listener for when the form is submitted
//  $(cmsForm).on("submit", function handleFormSubmit(event) {
 //   event.preventDefault();
   
 

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
 //   if (updating) {
 //     newUser.email = userEmail;
 //     updateUser(newUser);
  //  }
   
 // });
 // function getUserData(email) {
 //   $.get("/api/posts/" + email, function(data) {
  //    if (data) {
        // If this post exists, prefill our cms forms with its data
 //       nameInput.val(data.name);
 //       ageInput.val(data.age);
  //      weightInput.val(data.weight);
  //      heightInput.val(data.height);
  //      genderInput.val(data.gender);
        
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
  //      updating = true;
  //    }
  //  });
//  }
  // Update a given post, bring user to the blog page when done
//  function updateUser(user) {
 //   $.ajax({
 //     method: "PUT",
 //     url: "/api/users",
 //     data: user
//    })
 ///    .then(function() {
 //       window.location.href = "/members";
 //     });
 // }
 var signUpForm = $("form.cms");
  var nameInput = $("input#name");
  var ageInput = $("input#age");

 $.get("/api/user_data").then(function(data) {
   
    console.log(data.email);
    console.log(data)
  });
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      age: ageInput.val().trim()
    };

    if (!userData.name || !userData.age) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.age);
    nameInput.val("");
    ageInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, password) {
    $.post("/api/cms", {
      name: name,
      age: age
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }
});