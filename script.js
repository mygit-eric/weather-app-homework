async function getWeather(city) {
    try {
      const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
      if (!response.ok) throw new Error("City not found");
      
      const data = await response.json();
      
      if (!data.temperature) throw new Error("No data found");
      
      displayWeather(city, data);
      saveToHistory(city);
    } catch (error) {
      alert(error.message);
    }
  }

    // Display weather data in the card
  function displayWeather(city, data) {
    document.getElementById('weather-card').style.display = "block";
    document.getElementById('city-name').innerText = city;
    document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
    document.getElementById('wind').innerText = `Wind: ${data.wind}`;
    document.getElementById('description').innerText = `Description: ${data.description}`;
  

    const icon = document.getElementById('weather-icon');
    if (data.description.includes("rain")) {
      icon.src = "https://img.icons8.com/ios/100/000000/rain.png";
    }
    else if (data.description.includes("sun") || data.description.includes("clear")) {
      icon.src = "https://img.icons8.com/ios/100/000000/sun.png";
    }
     else {
      icon.src = "https://img.icons8.com/ios/100/000000/cloud.png";
    }
  
    // Set background color based on temperature
    setBackgroundColor(data.temperature);
  }


  function setBackgroundColor(tempString) {
    const temp = parseInt(tempString);
  
    if (temp <= 15) {
      document.body.style.backgroundColor = "lightblue";
    }
    else if (temp <= 25) {
      document.body.style.backgroundColor = "lightyellow";
    }
    else {
      document.body.style.backgroundColor = "lightcoral";
    }
  }
  
  document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
      getWeather(city);
    }
  });

  
  function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
  
    // Remove if already exists
    history = history.filter(item => item !== city);
  
    // Add new city at beginning
    history.unshift(city);
  
    // Keep only 3 items
    if (history.length > 3) {
      history = history.slice(0, 3);
    }
  
    localStorage.setItem('history', JSON.stringify(history));
    showHistory();
  }
  
  function showHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';
  
    history.forEach(city => {
      const div = document.createElement('div');
      div.innerText = city;
      div.className = 'history-item';
      div.addEventListener('click', () => getWeather(city));
      historyDiv.appendChild(div);
    });
  }
  
  // Load history on page load
  showHistory();
          