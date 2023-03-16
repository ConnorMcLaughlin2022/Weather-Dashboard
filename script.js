var city = $("#cityinput")
var searchBtn = $('#searchbtn')
var input = document.querySelector('cityinput')
var apiKey = "0e58904f442705bd2a5dbc3d0662d360"
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
const fiveDayContainer = document.querySelector("#forecast")
function getAPI(queryURL) {
  fetch(queryURL)
}



function searchWeather(event) {
  console.log(event.currentTarget)
  var clickSave = event.currentTarget;
  var textBox = $(clickSave).siblings("input");
  var textToSave = textBox.val()
  var cityName = $('<li></li>').text(textToSave)

  $('#city-name').text(textToSave)
  $('#history').prepend(cityName)
  $('#cityinput').val('');
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + textToSave + "&appid=0e58904f442705bd2a5dbc3d0662d360").then(
    function (response) {
      return response.json()

    }
  )
    .then(function (data) {
      console.log(data)
      if (data.clouds.all > 75) {
        $("#city-name").append(" ☁️")
      } else if (data.clouds.all < 15) {
        $("#city-name").append(" ☀️")
      } else {
        $("#city-name").append(" ⛅")
      }
      var temp = data.main.temp

      var tempF = (Math.trunc((temp - 273.15) * 9 / 5 + 32))
      $("#current").text(tempF + " °F");
      console.log(tempF)

      var tempL = data.main.temp_min

      var tempLF = (Math.trunc((tempL - 273.15) * 9 / 5 + 32))
      $("#tempL").text(tempLF + " °F");
      console.log(tempLF)

      var tempH = data.main.temp_max
      var tempHF = (Math.trunc((tempH - 273.15) * 9 / 5 + 32))
      $("#tempH").text(tempHF + " °F");
      console.log(tempHF)


      var humidity = data.main.humidity
      $("#humid").text(humidity + "%")
      var lat = data.coord.lat;
      var lon = data.coord.lon
      getForecast(lat, lon)
    })
}

const getForecast = function (lat, lon) {
  const forecastArray = []
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (response) {
      return response.json()
    })
    // console.log(response)
    .then(function (data) {
      console.log(data)
      console.log(data.cnt)
      for (let i = 0; i < data.cnt; i += 8) {
        console.log(data)
        console.log(forecastArray)
        const forecastCard =
          `<div class="block">   
                   <div class="content">
                       <p id="forecast-date">${data.list[i].dt_txt.split(" ")[0]}</p>
                       <p id="weather-5-day">${data.list[i].weather[0].description}</p>
                       <p id="temp-5-day">Temp:${data.list[i].main.temp}</p>
                       <p id="wind-5-day">Wind:${data.list[i].wind.speed}t</p>
                       <p id="humidity-5-day">Humidity:${data.list[i].main.humidity}</p>
                 </div>
              </div>`

        forecastArray.push(forecastCard)

      } fiveDayContainer.innerHTML = forecastArray
    })

}


// searchBtn.on("click", function(event){
//   event.preventDefault()
//   searchWeather
//   getForecast(city.value)
// });
searchBtn.on('click', searchWeather)
