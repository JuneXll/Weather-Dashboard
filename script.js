//Api key
var apiKey = "f887ad1638b929c3f93191c21d6e2672";

// Selected variables
var citySearch = $("#cityName");
var searchBtn = $("#search-button");
var currentCity = $("#current-city");
var temp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var uvIndex = $("#uv");

// Save the city searched 
var city = "";

// //Validate that city is actual city
// var trueCity = [];
// function find(c){
//   for(var i=0; i<trueCity.length; i++){
//     if(c.toUpperCase()===trueCity[i]){
//       return -1;
//     }
//   }
//   return 1;
// }

//Get city from input
function displayWeather(event){

  event.preventDefault();
  if(citySearch.val().trim()!==""){
    city = citySearch.val().trim();
    currentWeather(city);
  }
  console.log(city);
}


function currentWeather(city){
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
  $.ajax({
    url:apiURL,
    method:"GET",
})
  .then(function(response){
    console.log(response)

    var weatherIcon = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
    var date=new Date(response.dt*1000).toLocaleDateString();
    $(currentCity).html(response.name +"("+date+")" + "<img src="+iconURL+">");

    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    $(temp).html((tempF).toFixed(2) + "&#8457");

    $(humidity).html(response.main.humidity+"%");

    var windMPH = (response.wind.speed *2.237).toFixed(1);
    $(windSpeed).html(windMPH + "MPH");

    index(response.coord.lon,response.cood.lat);
    forecast(response.id);
    if(response.cod==200){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      console.log(sCity);
      if (trueCity==null){
          trueCity=[];
          trueCity.push(city.toUpperCase()
          );
          localStorage.setItem("cityname",JSON.stringify(trueCity));
          pastSearch(city);
      }
      else {
          if(find(city)>0){
              trueCity.push(city.toUpperCase());
              localStorage.setItem("cityname",JSON.stringify(trueCity));
              pastSearch(city);
          }
      }
  }

})
} 

// Response for UV index
function UVIndex(ln,lt){
  var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln;
  $.ajax({
          url:uvqURL,
          method:"GET"
          }).then(function(response){
              $(uvIndex).html(response.value);
          });
}
  
// 5 day forecast gets displayed
function forecast(cityid){
  var dayover= false;
  var forcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+apiKey;
  $.ajax({
      url:forcastURL,
      method:"GET"
  }).then(function(response){
      
      for (i=0;i<5;i++){
          var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
          var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
          var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
          var tempK= response.list[((i+1)*8)-1].main.temp;
          var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
          var humidity= response.list[((i+1)*8)-1].main.humidity;
      
          $("#fDate"+i).html(date);
          $("#fImg"+i).html("<img src="+iconurl+">");
          $("#fTemp"+i).html(tempF+"&#8457");
          $("#fHumidity"+i).html(humidity+"%");
      }
      
  });
}

//Create list for searched cities
function pastSearch(c){
  var listEl= $("<li>"+c.toUpperCase()+"</li>");
  $(listEl).attr("class","list-group-item");
  $(listEl).attr("data-value",c.toUpperCase());
  $(".list-group").append(listEl);
}
// display the past search again when the list group item is clicked in search history
function invokePastSearch(event){
  var liEl=event.target;
  if (event.target.matches("li")){
      city=liEl.textContent.trim();
      currentWeather(city);
  }

}

// render function
function loadlastCity(){
  $("ul").empty();
  var sCity = JSON.parse(localStorage.getItem("cityname"));
  if(sCity!==null){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      for(i=0; i<sCity.length;i++){
          pastSearch(sCity[i]);
      }
      city=sCity[i-1];
      currentWeather(city);
  }

}
//Clear the search history from the page
function clearHistory(event){
  event.preventDefault();
  sCity=[];
  localStorage.removeItem("cityname");
  document.location.reload();

}

//Click Handlers
$("#searchBtn").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
// $("#clear-history").on("click",clearHistory);













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




