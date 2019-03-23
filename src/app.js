const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Robotron'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Robotron'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Robotron',
    description: 'Something helpful'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        address: address,
        location: location,
        forecast: forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 ',
    author: 'Robotron',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Robotron',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
