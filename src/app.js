const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecase = require('./utils/forecast');
const forecast = require('./utils/forecast');


//set up an express server
const app = express()
const port = process.env.PORT || 3000;
console.log(port);
//define path for express config
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebars enine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//seteup static directory to server
app.use(express.static(pubDir))



app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Leevi Andrews'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page', 
    name: 'Leevi Andrews'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'You have herby made it, to the health....PAAAGGEEE',
    title: 'Help', 
    name: 'Leevi Andrews'
  })
})

//send back a msg/data to browser
app.get('/weather', (req, res) => {
  if(!req.query.location) {
    return res.send({
      error: 'You must provide a valid location'
    })
  }
  geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        forecast(latitude, longitude, (error, forecastData) => {
          const weatherConditions = forecastData.weather_descriptions, 
                windSpeed = forecastData.wind_speed,
                windDir = forecastData.wind_dir,
                temperature = forecastData.temperature;
          console.log(forecastData)
                res.send({
                  location: location, 
                  weather: weatherConditions,
                  temperature: temperature,
                  wind: `${windSpeed}mph ${windDir}`,
                  chanceOfPrecip: forecastData.precip,
                  humidity: forecastData.humidity
                })
        })
  })
})

app.get('/products', (req,res) => {
  if(!req.query.search) {
   return res.send({
      error: 'You must provide a valid search term.'
    })
  } 
  console.log(req.query.s)
  res.send({
    products:  []
  })
})

//grabs any url that has /help/'anything else'
app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error',
    name: 'Leevi Andrews',
    msg: 'Help article not found'
  })
})
//this call to get needs to come last in order to catch 404
app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error Page', 
    name: 'Leevi andrews',
    msg: 'Page not found'
  })
})


//start server
app.listen(port, () => {
  console.log('Server is up and running on port 3000')
})