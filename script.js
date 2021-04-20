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

// Get response for the current city searched
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

    var lonCoord = response.coord.lon;
    var latCoord = response.coord.lat;
    UVIndex(lonCoord,latCoord);
    forecast(response.id);
    if(response.cod==200){
      trueCity=JSON.parse(localStorage.getItem("city_name:"));
      if (trueCity==null){
          trueCity=[];
          trueCity.push(city.toUpperCase()
          );
          localStorage.setItem("city_name:",JSON.stringify(trueCity));
          pastSearch(city);
      }
      else {
          if(find(city)>0){
              trueCity.push(city.toUpperCase());
              localStorage.setItem("city_name:",JSON.stringify(trueCity));
              pastSearch(city);
          }
      }
  }

})
} 

// Response for UV index
function UVIndex(lan,lon){
  var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lan+"&lon="+lon;
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

          var temperature=(((tempK-273.5)*1.80)+32).toFixed(2);

          var humid= response.list[((i+1)*8)-1].main.humidity;
      
          $("#day"+i).html(date);
          $(".icon"+i).html("<img src="+iconurl+">");
          $(".temp"+i).html(temperature+"&#8457");
          $(".humidity"+i).html(humid+"%");
      }
      
  });
}

//Create list for searched cities
function pastSearch(c){
  var list= $("<li>"+c.toUpperCase()+"</li>");
  $(list).attr("class","list-group-item");
  $(list).attr("data-value",c.toUpperCase());
  $(".list-group").append(list);
}
// display the past search again when the list group item is clicked in search history
function invokePastSearch(event){
  var li=event.target;
  if (event.target.matches("li")){
      city=li.textContent.trim();
      currentWeather(city);
  }

}

// render function
function loadlastCity(){
  $("ul").empty();
  var trueCity = JSON.parse(localStorage.getItem("city_name:"));
  if(trueCity!==null){
      trueCity=JSON.parse(localStorage.getItem("city_name:"));
      for(i=0; i<trueCity.length;i++){
          pastSearch(trueCity[i]);
      }
      city=trueCity[i-1];
      currentWeather(city);
  }

}
//Clear the search history from the page
function clearSearch(event){
  event.preventDefault();
  trueCity=[];
  localStorage.removeItem("city_name:");
  document.location.reload();

}

//Click Handlers
$("#searchBtn").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear").on("click",clearSearch);












