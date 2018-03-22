$(document).ready(function(){

  // VARIABLES

  var muppetsArr = ['Kermit the Frog', 'Fozzie Bear', 'Beaker', 'Rowlf the Dog', 'Gonzo', 'Rizzo the Rat', 'Bunsen Honeydew']; 


  function renderButtons() {
    $('.gifBtns').empty(); 
    for (var i = 0; i < muppetsArr.length; i++) {
      var a = $('<button>'); 
      a.attr('data-name', muppetsArr[i]); 
      a.addClass('gifs');

      a.text(muppetsArr[i]); 
      $('.gifBtns').append(a); 
    }
  }; // ------ END renderButtons()
  

  function displayGifs() {
    $('.gifBtns').on('click', '.gifs', function () {
      console.log('Gif Button Clicked'); 

      var muppet = $(this).attr('data-name'); 
      console.log(this); 

      var apiKey = "OnXSLLwzqDTISi0eLfUfIZdZsTGBQ1qr";
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + muppet + "&api_key=" + apiKey + "&limit=10";
      console.log(queryURL); 

      // AJAX CALL
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
        var results = response.data; 
        // console.log(results); 

        for (i = 0; i < results.length; i++) {
          var gifFigure = $('<figure>');
          var gifImg = $("<img>");
          gifImg.addClass('image'); 
          gifImg.attr('src', results[i].images.original_still.url);
          gifImg.attr('data-animate', results[i].images.original.url); 
          gifImg.attr('data-still', results[i].images.original_still.url); 
          gifImg.attr('rating', results[i].rating); 
          gifImg.attr('data-state', 'still'); 
          var rating = results[i].rating; 
          // console.log(gifImg); 
          var gifCaption = $('<figcaption>'); 
          gifCaption.text('Rating: ' + rating); 
          gifFigure.append(gifCaption); 
          gifFigure.append(gifImg); 
          $('.gifImages').prepend(gifFigure);  
        }
      }) // ---- END Ajax
    }); // ------ END Click
  }; // ------ END displayGifs()

  //// Adds new button from form field
  $('#add').on('click', function(event) {
    event.preventDefault();
    console.log('CLICKED'); 
    var newGif = $('#userInput').val();
    muppetsArr.push(newGif); 
    console.log(muppetsArr); 
    renderButtons(); 
  }); // ----- END click event
  
  
  $('.gifImages').on('click', '.image', function () {
    console.log('GIF CLICKED'); 
    var state = $(this).attr('data-state'); 
    var still = $(this).attr('data-still'); 
    var animate = $(this).attr('data-animate'); 

    if (state === 'still') {
      state = 'animate'; 
      console.log(state); 
      $(this).attr('src', animate);
      $(this).attr('data-state', 'animate');
    }  else {
      $(this).attr('src', still);
      $(this).attr('data-state', 'still');
    }
  }); // ----- END click event


  $("#clear").on("click", function() {
    $('.form-group :input').val('');
  }); // ----- END click event


  
  // CLICK EVENTS
  
  displayGifs(); 
  renderButtons(); 

}); 






// var newDiv = $('<div  class="panel panel-default">');
// var newHead = $('<div id ="articleHeading" class = "panel-heading">');
// var newSnip = $('<div id="snippet" class = "panel-body">');

