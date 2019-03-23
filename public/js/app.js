const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageResponse = document.querySelector('#response');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  messageResponse.innerHTML = 'Loading...';

  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (messageResponse.innerHTML = 'Error: ' + data.error);
      }

      messageResponse.innerHTML = 'Location: ' + data.location + ' <br> Forecast: ' + data.forecast;
    });
  });
});
