const request = require('request');

const geocode = (address, callback) => {
  const key =
    'pk.eyJ1IjoiYWxvbnNvanFuIiwiYSI6ImNqc3diNGJ2eTBmd3E0M3A0ZmVsb2t3cWcifQ.MaTrQCkjVdOuMFMBM47ZPg';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`;

  request(
    {
      json: true,
      url
    },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to location services!', {});
      } else if (body.features.length === 0) {
        callback('Unable to find specified location.', {});
      } else {
        callback(undefined, {
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0]
        });
      }
    }
  );
};

module.exports = geocode;
