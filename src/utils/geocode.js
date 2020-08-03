const request = require('request');


const geocode = (address, callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json?access_token={Access_Tooken_Key}';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VyYWZmIiwiYSI6ImNrZDZ6Z29ybDAwdmIzM21zbDBueDl1dWIifQ.iDmM7taXYj-LtkAPPrdzLQ';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};


module.exports = geocode;