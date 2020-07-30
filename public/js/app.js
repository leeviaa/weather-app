
    const weatherForm = document.querySelector('form')
    const searchBar = document.querySelector('input')
    weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = searchBar.value;
     
      fetch(`http://localhost:3000/weather?location=${location}`)
      .then(res => {
        res.json().then( data => {
          if(data.error) {
            console.log(data.error);
          } else {
            const weatherContainer = document.querySelector('.weather-info');
            let weatherHtml = `<h3>Weather info for ${data.location}</h3>
              <p>The current weather conditions in ${data.location} is ${data.weather}, the temperature is ${data.temperature} and the wind is blowing ${data.wind} </p>
            
              `
              weatherContainer.innerHTML = weatherHtml;
           console.log(data);
            searchBar.value= '';
          }
        })
      }) 
    })