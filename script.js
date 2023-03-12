var city = $("#cityinput")
var apiKey = "0e58904f442705bd2a5dbc3d0662d360"
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

function getAPI(queryURL) { fetch(queryURL) }




var searchBtn = $('#search-button')
searchBtn.on('click'), searchWeather
function searchWeather(event) {
  console.log(event.currentTarget)
  var clickSave = event.currentTarget;
  var textBox = $(clickSave).siblings("input");
  var textToSave = textBox.val()
  var cityName = $('<li></li>').text(textToSave)
  
  $('#city-name').text(textToSave)
  $('#history').prepend(cityName)
  $('#cityinput').val('');
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + "textToSave+&appid=0e58904f442705bd2a5dbc3d0662d360").then(
    function (response) {
      return response.json()
    }
  )
    .then(function (data) {
      var temp = data.main.temp
      var tempF = (Math.trunc((temp - 273.15) * 9 / 5 + 32))
      $("#temp").text(tempF + " °F");
      var tempL = data.main.temp_min
      console.log(data)
      var tempLF = (Math.trunc((tempL - 273.15) * 9 / 5 + 32))
      $("#tempL").text(tempLF + " °F");

      var tempM = data.main.temp_max
      var tempMF = (Math.trunc((tempM - 273.15) * 9 / 5 + 32))
      $("#tempM").text(tempMF + " °F");
      if (data.clouds.all > 75) {
        $("#city-name").append(" ☁️")
      } else if (data.clouds.all < 15) {
        $("#city-name").append(" ☀️")
      } else {
        $("#city-name").append(" ⛅")
      }
      var humidity = data.main.humidity
      $("#Humidity").text(humidity + "%")

    })
}
