const searchBtn = document.querySelector(".Search-btn")
const input = document.querySelector(".location-input")
const apiKey = "d2ddb2b4e596e23d9ef52069cecf30aa";

// Listen enter key down event
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    if (event.key === "Enter" && input.value) getWeatherData(input.value);
    // update DOM
    let location = document.querySelector(".Location")
    // log the input Location in console
    console.log(input.value)
    location.innerHTML = input.value.trim()
    //clear input
    input.value = ""
  }
})

// Listen click event
searchBtn.addEventListener("click", () => {
  if (input.value) getWeatherData(input.value);
  console.log(input.value)
  input.value = ""
})

// Fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) throw new Error("City not found or API key invalid");

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

// Update the UI with fetched weather data
function updateUI(data) {
  document.querySelector(".Temprature").innerText = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".condition").innerText = data.weather[0].main;
  document.querySelector(".Location").innerText = data.name;
  const iconCode = data.weather[0].icon;
  document.querySelector(".time").innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.querySelector(".day").innerText = new Date().toLocaleDateString([], { weekday: 'long' });
  document.querySelector(".date").innerText = new Date().getDate();
  document.querySelector(".month").innerText = new Date().toLocaleDateString([], { month: 'long' });
  document.querySelector(".year").innerText = new Date().getFullYear();
  document.querySelector(".icon img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
