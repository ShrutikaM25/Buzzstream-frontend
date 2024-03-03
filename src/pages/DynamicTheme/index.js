import React, { useEffect, useState } from 'react';
import Particles from 'particles.js';
import './index.css';

const WeatherApp = () => {
  const [weatherCondition, setWeatherCondition] = useState('');
  const [loading, setLoading] = useState(true);

  const getWeatherInfo = async (lat, lon) => {
    const apiKey = '66bfd9c2c2756082558938e413e553a0';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('API Response:', data); 
      return data.weather[0].main;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours;
  };

  const updateTheme = (weatherCondition, currentTime) => {
    const body = document.body;
    const html = document.documentElement;

    console.log('Weather Condition:', weatherCondition); 


    // Set different themes based on weather conditions and time
    let backgroundGradient, color;

  // Set different gradient themes based on weather conditions and time
  if (weatherCondition === 'Clear') {
    if (currentTime >= 6 && currentTime < 18) {
      // Daytime for clear sky
      backgroundGradient = 'linear-gradient(to right, #87CEEB, #B0E0E6)'; // Sky Blue gradient
      color = '#000000'
    } else {
      backgroundGradient = 'linear-gradient(to right, #ADD8E6, #1E90FF)'; 
      color = '#FFFFFF';
    }
  } else if (weatherCondition === 'Clouds') {
    if (currentTime >= 6 && currentTime < 18) {
      backgroundGradient = 'linear-gradient(to right, #D3D3D3, #808080)'; 

    } else {
      backgroundGradient = 'linear-gradient(to left, #333333, #555555)';
      color = '#FFFFFF';

    }
  }

    body.style.background = backgroundGradient;
    body.style.color = color ; 
    html.style.color = color ;
    html.style.background = backgroundGradient;


  };

  const updateAnimations = (weatherCondition) => {
    const animationContainer = document.getElementById('animation-container');
  
    if (!animationContainer) {
      console.error('Animation container not found');
      return;
    }
  
    if (weatherCondition === 'Clear') {
      const currentTime = new Date().getHours(); 
      if (currentTime >= 6 && currentTime < 18) {
        const sunContainer = document.createElement('div');
        sunContainer.classList.add('sun-container');
        document.body.appendChild(sunContainer);
      
        const sun = document.createElement('div');
        sun.classList.add('sun');
        sunContainer.appendChild(sun);
      } else if (currentTime < 18) {
        setInterval(() => {
          generateStars();
        }, 100);
      }
      
    } else if (weatherCondition === 'Snow') {
      if (typeof Particles.init === 'function') {
        Particles.init({
          selector: '.snow-animation',
          sizeVariations: 5,
          color: '#ffffff',
          connectParticles: true,
          maxParticles: 100,
        });
      }
    } else if (weatherCondition === 'Rain') {

      const rainContainer = document.createElement('div');
  rainContainer.classList.add('rain-container');
  document.body.appendChild(rainContainer);

  for (let i = 0; i < 20; i++) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
    rainContainer.appendChild(raindrop);
  }
    }
  else if (weatherCondition === 'Clouds') {
    const sunContainer = document.createElement('div');
        sunContainer.classList.add('sun-container');
        document.body.appendChild(sunContainer);
      
        const sun = document.createElement('div');
        sun.classList.add('sun');
        sunContainer.appendChild(sun); 
  }

  const generateStars = () => {
    let star = document.createElement('div');
    star.setAttribute('class', 'star');
    document.body.appendChild(star);
    star.style.left = Math.random() * window.innerWidth + 'px';

    let size = Math.random() * 12;
    let duration = Math.random() * 3;
    star.style.fontSize = 12 + size + 'px';
    star.style.animationDuration = 2 + duration + 's';

    setTimeout(function () {
      document.body.removeChild(star);
    }, 5000);
  };


  };
  

  useEffect(() => {
    const locations = [
        { name: 'city1', latitude: 18.626751, longitude: 73.787599 }, //pune
    ];

    const fetchData = async () => {
      for (const location of locations) {
        const weatherInfo = await getWeatherInfo(location.latitude, location.longitude);

        if (weatherInfo) {
          const currentTime = getCurrentTime();
          setWeatherCondition(weatherInfo);
          updateTheme(weatherInfo, currentTime);
          updateAnimations(weatherInfo);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="animation-container" className="snow-animation">
      </div>
    </div>
  );
};

export default WeatherApp;
