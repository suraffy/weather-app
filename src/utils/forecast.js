const request = require('request');


const forecast = (latitude, longitude, callback ) => {
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY';
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&appid=fd89aa1bd3860ef54f3f2260f3a7081c';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather server!', undefined);
        }
        else if (response.body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            const description = response.body.weather[0].description;
            const temp = response.body.main.temp;
            const icon = response.body.weather[0].icon;
            // callback(undefined, `${weatherDesc}. It's currently ${} degree celsius out.`);
            callback(undefined, {
                description: response.body.weather[0].description,
                temp: response.body.main.temp,
                icon: response.body.weather[0].icon,
                id: response.body.weather[0].id
            });
        }
    });
};


module.exports = forecast;