$(document).ready(function() {
  $("#submitBtn").click(function() {
    event.preventDefault();

    // Variables and function names have been updated. I have not got this to work yet.

    // resultContainer holds all of our results
    var resultContainer = $("#results");

    // Variable to hold our results
    var results;

    // The code below handles the case where we want to get results for a specific user
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getResults(userId);
    }
    // If there's no userId we just get all results as usual
    else {
      getResults();
    }

    // This function grabs results from the database and updates the view
    function getResults(user) {
      userId = user || "";
      if (userId) {
        userId = "/?user_id=" + userId;
      }
      $.get("/api/destinations" + userId, function(data) {
        console.log("Destinations", data);
        results = data;
        if (!results || !results.length) {
          displayEmpty(user);
        } else {
          initializeRows();
        }
      });
    }

    // InitializeRows handles appending all of our constructed post HTML inside resultContainer
    function initializeRows() {
      resultContainer.empty();
      var resultsToAdd = [];
      for (var i = 0; i < results.length; i++) {
        resultsToAdd.push(createNewRow(results[i]));
      }
      resultContainer.append(resultsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostAuthor.text("Written by: " + post.Author.name);
      newPostAuthor.css({
        float: "right",
        color: "blue",
        "margin-top": "-10px"
      });
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      var newPostBody = $("<p>");
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostAuthor);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", post);
      return newPostCard;
    }

    // This function displays a message when there are no results
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Author #" + id;
      }
      resultContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html(
        "No results yet" +
          partial +
          ", navigate <a href='/cms" +
          query +
          "'>here</a> in order to get started."
      );
      resultContainer.append(messageH2);
    }
  });
});
