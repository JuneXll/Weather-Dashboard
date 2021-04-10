// Selected variables
var apiKey = "f887ad1638b929c3f93191c21d6e2672"
var cityName = document.getElementById("cityName").value;
var date = document.getElementById("currentDate");
var currentDate = moment().format("M/DD/YYYY");
console.log(currentDate);

// Display current date in city info
date.textContent = currentDate;











// Icon URL:http://openweathermap.org/img/wn/10d@2x.png
//5 day forecast: "http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=f887ad1638b929c3f93191c21d6e2672"