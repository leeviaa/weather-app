const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const BASE_URL = `http://api.weatherstack.com/current?access_key=a100e68b1b2071e90dc634eeba9ec8a2&units=f&query=${latitude},${longitude}`;
  request({ url: BASE_URL, json: true }, (error, { body } = {}) =>{
   
    if(error) {
      callback('Unable to connect to weather services.');
    } else if (body.error) {
      callback('Please enter valid coordinates ');
    } else {
      callback(undefined, body.current)
    };   
  });  
};

module.exports = forecast

