$(document).ready(function() {

    // array of celebrities
        //*CHALLENGE* the top 15 trending gifs

    var topic = ["bill murray", 
                 "robert downey jr", 
                 "sam rockwell", 
                 "bruce lee", 
                 "stephen colbert", 
                 "dave chappelle", 
                 "christian bale", 
                 "daniel day lewis",
                 "richard pryor",
                 "kevin hart",
                 "will ferrell",
                 "lil wayne",
                 "samuel l jackson",
                 "kanye west",
                 "tom cruise",
                 "brad pitt",
                 "paul newman",
                 "madonna",
                 "elton john"]
    
    //function that displays a button for each gif
    
    function displayBtns() {
        $("#btn-holder").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("btn btn-primary m-1");
            gifBtn.addClass("celeb");
            gifBtn.attr("data-name", topic[i]);
            gifBtn.text(topic[i]);
            $("#btn-holder").append(gifBtn);
        }
    }
    
    //function to add new button
    
    function newBtn() {
        $("#addGif").on("click", function() {
            var celeb = $("#topicInput").val().trim();
            if (celeb == ""){
                return false;//no blank buttons
            }
            topic.push(celeb);
    
            displayBtns();
            return false;
            });
    }
    
    //function to remove last button
    function rmvBtn() {
        $("removeGif").on("click", function() {
            topic.pop(celeb);
            displayBtns();
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var celeb = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=smYf27zDQ04iZVF7nLGQpBbJJeP4e8Rc&limit=15";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            $("#img-holder").empty();
            //save the results of the api query into a variable
            var results = response.data;
            if (results == ""){
                alert("no gif ;(!");	
            }
            for (var i = 0; i< results.length; i++){
                //make a new div for each gif
                var gifDiv = $("<div" + i + ">");
                //pull the rating of the gif from the json
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifTitle = $("<h2>").text(results[i].title);
                gifDiv.append(gifTitle, gifRating);
    
                //pull gif url to display the image
                var gifImg = $("<img>");
                gifImg.attr("src", results[i].images.original_still.url);
                //paused images
                gifImg.attr("data-still", results[i].images.original_still.url);
                //animated images
                gifImg.attr("data-animate", results[i].images.original.url);
                //images come in paused by default
                gifImg.attr("data-state", "still");
                gifImg.addClass("image");
                gifDiv.append(gifImg);
                //add div to the already existing divs
                $("#img-holder").prepend(gifDiv);
            }
        });
    }
    
    
    //list my default buttons
        //going to try and make this trending in future
    displayBtns();
    newBtn();
    rmvBtn();
       
    
    //event listeners
    $(document).on("click", ".celeb", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });