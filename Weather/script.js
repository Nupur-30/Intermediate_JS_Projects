function getCity() {
    const city = document.getElementById("search-Input").value || "Hyderabad";
    return city;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function getCoords() {
    let cityName = getCity();
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=f8d5f77cb993e32b6b6d0ad27929ee0f`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        return { latitude, longitude }; // returns an object with the coordinates
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchWeatherData() {
    const { latitude, longitude } = await getCoords(); // destructuring assignment
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f8d5f77cb993e32b6b6d0ad27929ee0f&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);

    // display main-temp
    const mainTemp= weatherData.main.temp;
    document.getElementsByClassName("main-temp")[0].innerHTML = mainTemp+"°C";

    // display min-max-temp
    const minTemp = weatherData.main.temp_min;
    document.getElementsByClassName("min")[0].innerHTML = minTemp+"°C";
    const maxTemp = weatherData.main.temp_max;
    document.getElementsByClassName("max")[0].innerHTML = maxTemp+"°C";

    // display the icon
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;

    // display the description
    const description = weatherData.weather[0].description;
    document.getElementsByClassName("weather-des")[0].innerHTML = description;

   // display the location    
    let cityName = getCity();
    cityName = capitalizeFirstLetter(cityName);
    document.getElementsByClassName("location")[0].innerHTML = cityName;

    // display the humdity
    const humidity = weatherData.main.humidity;
    document.getElementsByClassName("humidity-value")[0].innerHTML = humidity+"%";

    // display the wind-speed
    const windSpeed = weatherData.wind.speed;
    document.getElementsByClassName("wind-value")[0].innerHTML = windSpeed+" Km/h";

    // display the day, date & time
    document.getElementsByClassName("time")[0].innerText = new Date(Date.now()).toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

    document.getElementsByClassName("day")[0].innerHTML = new Date(Date.now()).toLocaleString('en-US', {
		weekday: 'long',
	}); 

    document.getElementsByClassName("date")[0].innerHTML = new Date(Date.now()).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}); 

    // display sunrise & sunset
    const sunrise = weatherData.sys.sunrise * 1000; //as the Date constructor in JS takes the time-value in ms
    const sunset = weatherData.sys.sunset * 1000;

    document.getElementsByClassName("sunrise-value")[0].innerHTML = new Date(sunrise).toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
    });

    document.getElementsByClassName("sunset-value")[0].innerHTML = new Date(sunset).toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});
}

async function fetchWeatherForecast() {
    const { latitude, longitude } = await getCoords();
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f8d5f77cb993e32b6b6d0ad27929ee0f&units=metric`;
    const response = await fetch(url);
    const weatherForecast = await response.json();

    const dayTemps = [
        { temp: weatherForecast.list[0].main.temp, icon: weatherForecast.list[0].weather[0].icon },
        { temp: weatherForecast.list[8].main.temp, icon: weatherForecast.list[8].weather[0].icon },
        { temp: weatherForecast.list[16].main.temp, icon: weatherForecast.list[16].weather[0].icon },
        { temp: weatherForecast.list[24].main.temp, icon: weatherForecast.list[24].weather[0].icon },
        { temp: weatherForecast.list[32].main.temp, icon: weatherForecast.list[32].weather[0].icon }
    ];

    const nextElements = document.querySelectorAll('.next');

    const labels = [];
    const temps = [];

    dayTemps.forEach((day, index) => {
        if (nextElements[index]) {
            // update temperature and icon
            nextElements[index].querySelector('.temp').innerHTML = `${Math.round(day.temp)}°C`;
            nextElements[index].querySelector('.icon img').src = `http://openweathermap.org/img/wn/${day.icon}.png`;

            // calculate the date for each forecasted day
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + index + 1); // +1 because index 0 is set to be "tomorrow"

            // update the weekDay
            nextElements[index].querySelector('.weekDay').innerHTML = forecastDate.toLocaleString('en-US', {
                weekday: 'short',
            });

            // update the dayRelative
            if (index === 0) {
                nextElements[index].querySelector('.dayRelative').innerHTML = "Tom"; 
            } else {
                nextElements[index].querySelector('.dayRelative').innerHTML = forecastDate.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                });
            }

            labels.push(forecastDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }));
            temps.push(day.temp);
        }
    });

    // create the chart
    displayWeatherGraph(labels, temps);
}

function displayWeatherGraph(labels, temps) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);

    gradient.addColorStop(0, '#2552046d');  
    gradient.addColorStop(1, '#1232074d');   

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: '#393f3495',    
                backgroundColor: gradient, 
                fill: true,               
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#393F34'
                    }
                }
            },
        }
    });
}

function handleSearch() {
    fetchWeatherData();
    fetchWeatherForecast();
}

document.getElementById("search-Input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
    }
});


document.addEventListener("DOMContentLoaded", handleSearch());

