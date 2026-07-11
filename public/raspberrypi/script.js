var tempDoc = document.getElementById("temp");
var windDoc = document.getElementById("wind");
var dateDoc = document.getElementById("date");
var timeDoc = document.getElementById("time");
var imgA = document.getElementById("img");
var imgB = document.getElementById("img2");
var forecastDoc = document.getElementById("forecast");

var photos = [
  "/raspberrypi/photos/img1.jpg",
  "/raspberrypi/photos/img2.jpg",
  "/raspberrypi/photos/img3.png",
  "/raspberrypi/photos/img4.jpg",
  "/raspberrypi/photos/img5.png",
  "/raspberrypi/photos/img6.jpg",
];
var photoIndex = 0;
var activeLayer = imgA;

function weatherEmoji(code) {
  return "";
}

function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

onStart();

setInterval(() => {
  loadtemp();
  advancePhoto();
}, 60000);

setInterval(() => {
  gettime();
}, 1000);

function onStart() {
  loadtemp();
  gettime();
}

function advancePhoto() {
  photoIndex = (photoIndex + 1) % photos.length;
  var nextLayer = activeLayer === imgA ? imgB : imgA;

  nextLayer.src = photos[photoIndex];
  nextLayer.onload = () => {
    nextLayer.classList.add("active");
    activeLayer.classList.remove("active");
    activeLayer = nextLayer;
  };
}

function loadtemp() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.7317&longitude=-93.6001" +
      "&current_weather=true" +
      "&daily=temperature_2m_max,temperature_2m_min,weathercode" +
      "&timezone=America/Chicago&forecast_days=7",
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      var tempF = cToF(data.current_weather.temperature);
      var windKph = data.current_weather.windspeed;
      var windMph = parseInt(windKph * 0.621371);

      tempDoc.innerHTML = tempF + "°";
      windDoc.innerHTML = windMph + " mph Wind";

      renderForecast(data.daily);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function renderForecast(daily) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var html = "";

  for (var i = 0; i < 7; i++) {
    var date = new Date(daily.time[i] + "T12:00:00");
    var dayName = i === 0 ? "Today" : days[date.getDay()];
    var emoji = weatherEmoji(daily.weathercode[i]);
    var hi = cToF(daily.temperature_2m_max[i]);
    var lo = cToF(daily.temperature_2m_min[i]);

    html +=
      '<div class="forecast-day">' +
      '<span class="forecast-emoji">' +
      emoji +
      "</span>" +
      '<span class="forecast-name">' +
      dayName +
      "</span>" +
      '<span class="forecast-temps">' +
      hi +
      "° <span class='lo'>" +
      lo +
      "°</span></span>" +
      "</div>";
  }

  forecastDoc.innerHTML = html;
}

function gettime() {
  const now = new Date();
  timeDoc.innerHTML = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  dateDoc.innerHTML = now.toLocaleDateString();
}
