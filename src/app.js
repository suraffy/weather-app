const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');

const app = express();

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templets/views');
const partialsPath = path.join(__dirname, '../templets/partials');


// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Current Weather',
        author: 'Surafel Araya'
    });
});


app.get('/forecast', (req, res) => {
    res.render('in404', {
        title: '404 Error',
        errorMessage: 'Oops! Forecast Data Not Available',
        author: 'Surafel Araya'
    })
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Surafel Araya',
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get help',
        message: 'How can I access the probability of rain around my location?',
        author: 'Surafel Araya',
    });
});



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address;

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                description: forecastData.description,
                temprature: forecastData.temp,
                icon: forecastData.icon,
                id: forecastData.id,
                location: data.location,
                address
            });
        });

    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Your must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        product: []
    });
});








app.get('/help/*', (req, res) => {
    res.render('in404', {
        title: '404 error',
        author: 'Surafel',
        errorMessage: 'Help article not found'
    });
});



app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMessage: 'Page Not Found'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});