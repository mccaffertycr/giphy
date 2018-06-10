 
var giphyApp = {
    gifBtn: [],
    // gifBtns: ["bill murray", 
    //           "robert downey jr", 
    //           "sam rockwell", 
    //           "bruce lee", 
    //           "stephen colbert", 
    //           "dave chappelle", 
    //           "christian bale", 
    //           "daniel day lewis"],
    gifImg: [],
    limit: 25,
    gifURL: [],
    gifSearch: []
}

// giphyApp.gifBtns.forEach(function(ele) {
    var queryURL = "http://api.giphy.com/v1/gifs/trending&api_key=smYf27zDQ04iZVF7nLGQpBbJJeP4e8Rc";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("I got data");
        console.log(response);
        console.log(response.data[0].embed_url);
    // make a button for each response
    giphyApp.gifBtn = $("<input>");
    giphyApp.gifBtn.attr("value", ele).addClass("btn btn-primary m-1");
    // add button to the button holder div
    $("#btn-holder").append(giphyApp.gifBtn);
    // push embed url to url array
    for (var i = 0; i < response.data.length; i++) {
    giphyApp.gifURL.push(response.data[i].images.original.url);
    }
    // add click function to button that populates img holder
    giphyApp.gifBtn.click(function() {
        for (var i = 0; i < response.data.length; i++) {
            giphyApp.gifImg = $("<img src=" + response.data[i].images.original.url +
                                "alt=" + response.data[i].url + ">")
            // giphyApp.gifImg.attr("src", response.data[i].images.original.url)
            // .attr();
            $("#img-holder").append(giphyApp.gifImg);
        }
    });
    });
//  var tableBody = $("tbody");
//    // Create and save a reference to new empty table row
//  var newRow = $("<tr>");
//    // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
//  var title = $("<td>").text(response.Title);
//  var dir = $("<td>").text(response.Director);
//  var year = $("<td>").text(response.Year);
//  var actors = $("<td>").text(response.Actors);
//    // Append the td elements to the new table row
//  newRow.append(title, dir, year, actors);
//    // Append the table row to the tbody element
//  tableBody.append(newRow);
//  });
// });
// });

