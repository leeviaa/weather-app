
    const weatherForm = document.querySelector('form')
    const searchBar = document.querySelector('input')
    weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = searchBar.value;
    
      fetch(`/weather?location=${location}`)
      .then(res => {
        res.json().then( data => {
          if(data.error) {
            console.log(data.error);
          } else {
            const weatherContainer = document.querySelector('.weather-info');
            let weatherHtml = `<h3> The Weather info for ${data.location}</h3>
              <p>The current weather conditions in ${data.location} is ${data.weather}. The temperature is ${data.temperature} with wind blowing at ${data.wind}, and there is a ${data.chanceOfPrecip}% chance of precipitation. The current humidity is ${data.humidity}%  </p>
            
              `
              weatherContainer.innerHTML = weatherHtml;
            searchBar.value= '';
          }
        })
      }) 
    })