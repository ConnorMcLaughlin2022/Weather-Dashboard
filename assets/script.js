var apiKey = "0e58904f442705bd2a5dbc3d0662d360"


var city = $("#cityinput")
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

function searchWeather (event) {
    console.log(event.currentTarget)
    var clickSave = event.currentTarget;
    var textBox = $(clickSave).siblings("input");
    var textToSave = textBox.val()
    
$("#current").text(textToSave)
  }


