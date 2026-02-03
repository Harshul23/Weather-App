import { API_KEY } from "./config.js";
const searchBtn = document.querySelector(".Search-btn");
const input = document.querySelector(".location-input");
const apiKey = API_KEY;

console.log("API Key:", apiKey);

// Listen enter key down event
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    if (event.key === "Enter" && input.value) getWeatherData(input.value);
    // log the input Location in console
    console.log(input.value);
    //clear input
    input.value = "";
  }
});

// Listen click event
searchBtn.addEventListener("click", () => {
  if (input.value) getWeatherData(input.value);
  console.log(input.value);
  input.value = "";
});

// Fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    // Catch the invalid input or not found error
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateDOM(data);

    // Calling function to Update UI
  } catch (error) {
    alert(error.message);
  }
}

// Update the UI with fetched weather data
function updateDOM(data) {
  const temprature = data.main.temp;
  const location = data.name;
  console.log(data);
  // Temprature condition and location.
  document.querySelector(".Temprature").innerText =
    `${Math.round(temprature)}°C`;
  document.querySelector(".condition").innerText = data.weather[0].main;
  document.querySelector(".Location").innerText = location;
  const iconCode = data.weather[0].icon;
  // Date, Time, month, Year and Day
  document.querySelector(".time").innerText = new Date().toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
  );
  document.querySelector(".day").innerText = new Date().toLocaleDateString([], {
    weekday: "short",
  });
  document.querySelector(".date").innerText = new Date().getDate();
  document.querySelector(".month").innerText = new Date().toLocaleDateString(
    [],
    { month: "long" },
  );
  document.querySelector(".year").innerText = new Date().getFullYear();
  // Weather Status Icon
  document.querySelector(".icon img").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
