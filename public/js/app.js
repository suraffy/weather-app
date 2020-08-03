console.log('JavaScript is loading...');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const tempraturePlace = document.getElementById('temperature');
const descriptionPlace = document.getElementById('description');
const locationPlace = document.getElementById('location');
const weatherIcon = document.getElementById('weather_icon');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    tempraturePlace.textContent = '-';
    descriptionPlace.textContent = 'Loading';
    descriptionPlace.className = 'desc_loading';
    

    locationPlace.textContent = '';
    weatherIcon.src = '/img/unknown_weather.png';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                descriptionPlace.textContent = '';
                descriptionPlace.className = 'no_desc_loading';
                locationPlace.textContent = data.error;
                return;
            }

            let weatherDesc = data.description[0].toUpperCase() + data.description.slice(1);
            
            descriptionPlace.className = 'no_desc_loading';

            tempraturePlace.textContent = data.temprature.toFixed() + '°C';
            descriptionPlace.textContent = weatherDesc;
            locationPlace.textContent = data.location;

            const icon = 'http://openweathermap.org/img/wn/' + data.icon + '@4x.png';

            weatherIcon.src = icon;

            // weatherIcon.className = 'owf owf-' + data.cod + 'owf-5x';
            // document.getElementById('owf').className = 'owf owf-' + data.id + ' owf-5x';
    });
});
});

