import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import config from '../../config.js'

const WeatherApp = () => {
  const [weatherCondition, setWeatherCondition] = useState('');
  const [loading, setLoading] = useState(true);
  const [animationElements, setAnimationElements] = useState([]);
  const animationContainerRef = useRef(null);
  const getWeatherInfo = async (lat, lon) => {
    const apiKey = config.openWeatherMapApiKey;
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


    let backgroundGradient, color;


  if (weatherCondition === 'Clear') {
    if (currentTime >= 6 && currentTime < 18) {
      backgroundGradient = 'linear-gradient(to right, #87CEEB, #B0E0E6)'; 
      color = '#000000'
    } else {
      backgroundGradient = 'linear-gradient(to right, #1E90FF, #000000)'; 
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
    const animationContainer = animationContainerRef.current;

    // if (!animationContainer) {
    //   console.error('Animation container not found');
    //   return;
    // }

    setAnimationElements([]);

    if (weatherCondition === 'Clear') {
      const currentTime = new Date().getHours();
      if (currentTime >= 6 && currentTime < 18) {
        setAnimationElements([<div key={1} className="sun" />]);
      } else if (currentTime > 18) {
        setInterval(() => {
          generateStars();
        }, 100);
        
      }
    } else if (weatherCondition === 'Snow') {
      setAnimationElements([<div key={1} className="snowfall" />]);
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
    } else if (weatherCondition === 'Clouds') {
      const currentTime = new Date().getHours();
      if (currentTime >= 6 && currentTime < 18) {
        setAnimationElements([<div key={1} className="sun" />]);
  
      } else if (currentTime > 18) {
        setInterval(() => {
          generateStars();
        }, 100);
      }
    }
  };
  
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
          console.log("MMM:", animationElements)
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
      <div id="animation-container" >
        {animationElements}
      </div>
    </div>
  );
};

export default WeatherApp;
