const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGVldmlhYSIsImEiOiJja2N6OWl3YncwaG90MnJwajBzN3Z6Ymp5In0.PX6Evb03OT6-CvLHdouSBw&limit=1`

  //using request
  request({url: url, json: true}, (error, { body } = {}) => {
    if(error) {
      callback('unable to connect to location services', undefined)
    }  else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode