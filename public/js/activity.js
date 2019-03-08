$(document).ready(function() {
    var $newItemInput = $("input.new-item");
    var $activityContainer = $(".activity-container");
    // Adding event listeners for deleting, editing, and adding activity
    $(document).on("click", "button.delete", deleteActivity);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".activity-item", editActivity);
    $(document).on("keyup", ".activity-item", finishEdit);
    $(document).on("blur", ".activity-item", cancelEdit);
    $(document).on("submit", "#activity-form", insertActivity);
  
    var activity = [];
  
    // Getting activity from database when page loads
    getActivity();
  
    // This function resets the activity displayed with new activity from the database
    function initializeRows() {
      $activityContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < activity.length; i++) {
        rowsToAdd.push(createNewRow(activity[i]));
      }
      $activityContainer.prepend(rowsToAdd);
    }
  
    // This function grabs activity from the database and updates the view
    function getActivity() {
      $.get("/api/active", function(data) {
        activity = data;
        initializeRows();
      });
    }
  
    // This function deletes an activity when the user clicks the delete button
    function deleteActivity(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/active" + id
      }).then(getActivity);
    }
  
    // This function handles showing the input box for a user to edit a activity
    function editActivity() {
      var currentActivity = $(this).data("activity");
      $(this).children().hide();
      $(this).children("input.edit").val(currentActivity.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var activity = $(this).parent().data("activity");
      activity.complete = !activity.complete;
      updateActivity(activity);
    }
  
    // This function starts updating a activity in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedActivity = $(this).data("activity");
      if (event.which === 13) {
        updatedActivity.text = $(this).children("input").val().trim();
        $(this).blur();
        updateActivity(updatedActivity);
      }
    }
  
    // This function updates a activity in our database
    function updateActivity(activity) {
      $.ajax({
        method: "PUT",
        url: "/api/active",
        data: activity
      }).then(getActivity);
    }
  
    // This function is called whenever a activity item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentActivity= $(this).data("activity");
      if (currentActivity) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentActivity.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a activity-item row
    function createNewRow(activity) {
      var $newInputRow = $(
        [
          "<li class='list-group-item activity-item'>",
          "<span>",
          activity.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", activity.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("activity", activity);
      if (activity.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new activity into our database and then updates the view
    function insertActivity(event) {
      event.preventDefault();
      var activity = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/active", activity, getActivity);
      $newItemInput.val("");
    }
    event.preventDefault();
  });