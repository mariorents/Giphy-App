
// Function that will run all other functions below
$(function(){
    addButtons (topics, "searchbutton", "#ButtonsDiv");
    console.log("working")
});

// Starting topics that will be displayed once page is loading
const topics = ["Michael Jordan", "Larry Bird", "Magic Johnson"];

// Function to add buttons from array above in loop giving them a class and assigning them to an area to display simultaneously 
function addButtons (topics, classAdd, areaToAdd){
    // Clears the submit form once imput has been submitted 
    $(areaToAdd).empty();
    // will loop all objects in array and display them next to the others as buttons    
    for (let i=0; i < topics.length; i++){
        // Assigned variable to button element 
        const a = $( "<button>" );
        // added class to new variable button 'a' 
        a.addClass(classAdd);
        // assigned attribute to distinguish between buttons 
        a.attr("data-type", topics[i]);
        //displays name of button as searched
        a.text(topics[i]);
        // displays on DOM
        $(areaToAdd).append(a);
    };      
};

// when the new button gets created and is clicked runs function to get giphys  
$(document).on("click", ".searchbutton", function() {
    $("#displayGifs").empty();
    let type = $(this).data("type");
    const queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+"&api_key=r9E6LoscD3k1jLhL7Q1WCsBH0LaLMJWM&limit=10";
    console.log(type);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {  
                // checking to see if the GET function is working 
                console.log(response)
                    for(let i=0; i < response.data.length; i++){
                        const newPicDiv = $("<div class='searchedImg'>");
                        let rating = response.data[i].rating;
                        let p = $("<p>").text("Rating:" + rating);
                        const AnimGif = response.data[i].images.fixed_height.url;
                        const stillGif = response.data[i].images.fixed_height_still.url;   
                        const img = $("<img>");
                        img.attr("src", stillGif);
                        img.attr("data-still", stillGif);
                        img.attr("data-resp", AnimGif);  
                        img.attr("data-state", "still");
                        img.addClass("searchedImg");
                        newPicDiv.append(p);
                        newPicDiv.append(img);
                        $("#displayGifs").append(newPicDiv);
                    };

        })
});

$(document).on("click", ".searchedImg", function(){
    let state = $(this).attr('data-state');
    if(state == "still"){
        $(this).attr("src", $(this).data("resp"));
        $(this).attr("data-state","resp" );
    }
    else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


$("#addButtonSearch").on("click", function(){
    let newButton = $("input").eq(0).val();
    topics.push(newButton);
    addButtons(topics, "searchbutton", "#ButtonsDiv");
    return false;
});
                        