//Api key
var apiKey = "f887ad1638b929c3f93191c21d6e2672";

// Selected variables
var citySearch = $("#cityName");
var searchBtn = $("#search-button");
var currentCity = $("#current-city");
var temp = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");

// Save the city searched 
var city = "";

//Validate that city is actual city
var trueCity = [];
function find(c){
  for(var i=0; i<trueCity.length; i++){
    if(c.toUpperCase()===trueCity[i]){
      return -1;
    }
  }
  return 1;
}



//Get city from input
function displayWeather(event){

  event.preventDefault();
  if(citySearch.val().trim()!==""){
    city = citySearch.val().trim();
    currentWeather(city);
  }

}


function currentWeather(city){
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

  fetch(apiURL)
  .then(function(response){
    console.log(response);

    var weatherIcon = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
    var date=new Date(response.dt*1000).toLocaleDateString();
    $(currentCity).html(response.name +"("+date+")" + "<img src="+iconURL+">");

    var fTemp = (response.main.temp - 273.15) * 1.80 + 32;
    $(tempt).html((fTemp).toFixed(2) + "&#8457");

    $(humidity).html(response.main.humidity+"%");

    var windMPH = (response.wind.speed *2.237).toFixed(1);
    $(windSpeed).html(windMPH + "MPH");

    index(response.coord.lon,response.cood.lat);
    forecast(response.id);
    if(response.cod==200){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      console.log(sCity);
      if (sCity==null){
          sCity=[];
          sCity.push(city.toUpperCase()
          );
          localStorage.setItem("cityname",JSON.stringify(sCity));
          addToList(city);
      }
      else {
          if(find(city)>0){
              sCity.push(city.toUpperCase());
              localStorage.setItem("cityname",JSON.stringify(sCity));
              addToList(city);
          }
      }
  }






  })
} 









// Icon URL:http://openweathermap.org/img/wn/10d@2x.png
//5 day forecast: "http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=f887ad1638b929c3f93191c21d6e2672"

//1. Retrieve the input text and store it in a variable. 
    //-Variable will be passed through url
    //-Prevent default or clear the text from input
    //-Removes other listed cities
    //-**Adds new li with new city name text
        //-Has same classes as main page li's
    //-**When a new city is searched, it will be added to the list created/LOOP
//2.Store Temp, humidity, wind speed, and uv index in variables
    //-Fetch the data and store info
    //-Response will plug in the information for selected data
        //-city info: Name, currentDate, weather icon, temp, humidity, wind speed, uv index
        //-5 day: date, weather icon, temp, humidity




