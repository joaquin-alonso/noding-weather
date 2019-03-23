const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const key = '56861213d12441d45ac761467c35e59c';
  const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`;

  request(
    {
      json: true,
      url
    },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to forecast services!', {});
      } else if (body.error) {
        callback('Unable to find forecast information for specified location.', {});
      } else {
        callback(
          undefined,
          `${body.currently.summary}, temperature: ${body.currently.temperature}, chance of rain: ${
            body.currently.precipProbability
          }%`
        );
      }
    }
  );
};

module.exports = forecast;
