if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        const {latitude, longitude} = position.coords;
        const api = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

        (async function fetchData() {
            const response = await fetch(api);
            const data = await response.json();
            return data;
        })().then(response => {

            const celsius = response.main.temp, 
                ferenheit = (celsius * 1.8) + 32, 
                location = response.name,
                temperatureDOM = document.querySelector("#temp");

            document.querySelector("#weather-location").textContent = location;
            temperatureDOM.textContent = Math.floor(celsius);
            document.querySelector("#weather-description").textContent = response.weather[0].description;

            

            temperatureDOM.addEventListener("click", () => {

                if(temperatureDOM.textContent == celsius) {
                    temperatureDOM.textContent = Math.floor(ferenheit);
                    document.querySelector("#temp-type").textContent = "°F";

                } else {
                    temperatureDOM.textContent = Math.floor(celsius);
                    document.querySelector("#temp-type").textContent = "°C";
                }
            });

            const icons = new Skycons({ "color": "white" }), 
                icon1 = document.querySelector("#icon1");

            icons.play();

            switch(response.weather[0].main) {
                case "Clouds":
                    icons.set(icon1, Skycons.CLEAR_DAY);
                    break;
                case "Clear-night":
                    icons.set(icon1, Skycons.CLEAR_NIGHT);
                    break;
                case "Partly-cloudy-day":
                    icons.set(icon1, Skycons.PARTLY_CLOUDY_DAY);
                    break;
                case "Partly-cloudy-night":
                    icons.set(icon1, Skycons.PARTLY_CLOUDY_NIGHT);
                    break;
                case "Clouds":
                    icons.set(icon1, Skycons.CLOUDY);
                    break;
                case "Rain":
                    icons.set(icon1, Skycons.RAIN);
                    break;
                case "Sleet":
                    icons.set(icon1, Skycons.SLEET);
                    break;
                case "Snow":
                    icons.set(icon1, Skycons.SNOW);
                    break;
                case "Wind":
                    icons.set(icon1, Skycons.WIND);
                    break;
                case "Fog":
                    icons.set(icon1, Skycons.FOG);
                    break;                                                     
            }
           });
    });
}