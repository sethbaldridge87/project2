
$(document).ready(function () {
    var nameInput = $("#name");
    var weightInput = $("#weight");
    var ageInput = $("#age");
    var cmsForm = $("#cms");

    $.get("/api/user_data", function (data) {
        console.log("Here's the data:");
        console.log(data);
        nameInput.val(data.name);
        weightInput.val(data.weight);
        ageInput.val(data.age);
    });

    $("#submit").click(function (data) {


        data.preventDefault();
        var obj = {
            name: $("#name").val(),
            weight: $("#weight").val(),
            age: $("#age").val()
        };
        console.log(obj)
        // var nameInput = $("#name");
        // var weightInput = $("#weight");
        ///  var ageInput = $("#age");
        // var cmsForm = $("#cms");

        //   console.log(nameInput, weightInput, ageInput)

        $.ajax({
            type: "PUT",
            url: "/api/update",
            data: obj
        }).then(function (response) {
            console.log(response)
        });


// $.post("api/update",obj)
// .then(function(obj){
//   console.log("this is new "+ obj)
// })

//      .done(function(res){
//       console.log("this is the res"+res)
//         })



    })

});

