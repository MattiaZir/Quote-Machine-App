var tweetText = "";
var backgroundURL = [
  "https://static.pexels.com/photos/23049/pexels-photo.jpg", 
  "https://static.pexels.com/photos/1826/wood-nature-sunny-forest.jpg",
  "https://static.pexels.com/photos/33247/amalfi-sea-seaside-town-seaside.jpg",
  "https://static.pexels.com/photos/165785/pexels-photo-165785.jpeg",
  "https://static.pexels.com/photos/56865/adler-bird-bird-of-prey-raptor-56865.jpeg"
]

$(document).ready(function() { // new quote at start
  newQuote();
  
  $('#newQuote').click(function() { // new quote when button is clicked
  newQuote()
  });

  $('#tweet').click(function () { // tweet button functionality
  tweet(); 
  });
});

// updating the quote and text of the tweet
function updateQuote(response) {
  tweetText = "";
  $("#quote").html('"' + response.quoteText + '"');
  tweetText += '"' + response.quoteText + '" ';
  
  if(response.quoteAuthor !== ''){
    $("#author").html("- " + response.quoteAuthor);
    tweetText += "- " + response.quoteAuthor;
    }
  else {
    $("#author").html("- Anonymous");
    tweetText += "- Anonymous";
  }
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}

function tweet() {
  window.open("https://twitter.com/intent/tweet?text=" + tweetText, "", "width=500, height=500, top=100, left=400");
}

// AJAX request for a new quote to API
function newQuote() {
  changeBg();
    $.ajax({
    method: 'POST',
    jsonp: 'jsonp',
    url: 'https://api.forismatic.com/api/1.0/',
    dataType: 'jsonp',
    data: {
      method: 'getQuote',
      format: 'jsonp',
      lang: 'en',
    }
  }).done(updateQuote).fail(handleErr);
}

function changeBg() {
  var random = Math.floor(Math.random() * backgroundURL.length);
  
    $('body').css({
    'background' : 'url('+backgroundURL[random]+') no-repeat center center fixed',
    'background-size': 'cover',
    '-webkit-background-size' : 'cover',
    '-moz-background-size' : 'cover',
    '-o-background-size' : 'cover'
  });
}