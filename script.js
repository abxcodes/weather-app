const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    uiInfo = inputPart.querySelector(".ui-info"),
    infoPart = wrapper.querySelector(".info-part");
(input = inputPart.querySelector(".input")), (celcius = "°c");

const submitBtn = document.querySelector(".search");
const locationBtn = document.querySelector(".locate");
const cityName2 = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const feels = document.querySelector(".feels");
const highTEMP = document.querySelector(".highTEMP");
const MinT = document.querySelector(".MinT");
const hum = document.querySelector(".hum");
const pressu = document.querySelector(".pressu");
const visibl = document.querySelector(".visibl");

let api;
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && input.value != "") {
        cityName(input.value);
    }
});

submitBtn.addEventListener("click", () => {
    cityName(input.value);
});

locationBtn.addEventListener("click", () => {
    uiInfo.classList.add("pending");
    uiInfo.textContent = "Searching your coordinate";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("This device does not support Geolocation");
    }
});
function onSuccess(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=b41ec3be35c7dac8aabbc21ba253137a`
    )
        .then((res) => res.json())
        .then((result) => weather(result));
}

function onError(msg) {
    console.log(msg);
    uiInfo.classList.add("error");
    uiInfo.textContent = msg.message;
}

function cityName(city) {
    uiInfo.classList.add("pending");
    uiInfo.textContent = "Searching....";
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b41ec3be35c7dac8aabbc21ba253137a`
    )
        .then((res) => res.json())
        .then((result) => weather(result));
}

function weather(info) {
    if (info.cod == "404") {
        uiInfo.textContent = `${input.value} is not a valid city`;
        uiInfo.classList.replace("pending", "error");
    } else {
        input.value = "";
        uiInfo.textContent = "Found search";
        infoPart.classList.add("active");
        cityName2.textContent = info.name;

        temp.innerHTML = ` ${Math.round(info.main.temp - 272.15)}${celcius}`;
        feels.textContent = `FEELS LIKE:  ${Math.round(
            info.main.feels_like - 272.15
        )}${celcius}`;
 
        highTEMP.innerHTML = `<i class="fa-solid fa-temperature-high fa-1x"></i> Maximum temperature:  ${Math.round(
            info.main.temp_max - 273.15
        )}${celcius}`;

        MinT.innerHTML = `<i class="fa-solid fa-temperature-high fa-1x"></i> Minimum temperature:  ${Math.round(
            info.main.temp_min - 273.15
        )}${celcius}`;

        hum.innerHTML = `<i class="fa-solid fa-droplet fa-1x symb"></i> Humidity:  ${info.main.humidity}%`;

        pressu.innerHTML = `<i class="fa-solid fa-cloud fa-1x"></i> Pressure:  ${info.main.pressure}hpa`;

        visibl.innerHTML = `<i class="fa-solid fa-wind fa-1x symb"></i> Visibility: ${Math.round(info.visibility / 1000)}km`;
    }
}
