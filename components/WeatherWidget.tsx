import React, { useState, useEffect } from 'react';
import LoadingSpinner from './icons/LoadingSpinner';
import LocationPinIcon from './icons/LocationPinIcon';
import SunnyIcon from './icons/SunnyIcon';
import CloudyIcon from './icons/CloudyIcon';
import RainyIcon from './icons/RainyIcon';

type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rainy';

interface WeatherData {
  location: string;
  temperature: number;
  condition: WeatherCondition;
}

const WeatherIcon: React.FC<{ condition: WeatherCondition }> = ({ condition }) => {
  switch (condition) {
    case 'Sunny':
      return <SunnyIcon className="w-20 h-20 text-yellow-400" />;
    case 'Cloudy':
      return <CloudyIcon className="w-20 h-20 text-slate-400" />;
    case 'Rainy':
      return <RainyIcon className="w-20 h-20 text-blue-400" />;
    default:
      return null;
  }
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching weather data
    const timer = setTimeout(() => {
      const conditions: WeatherCondition[] = ['Sunny', 'Cloudy', 'Rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        location: 'London, UK',
        temperature: Math.floor(Math.random() * 15) + 10, // Temp between 10 and 25
        condition: randomCondition,
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <LoadingSpinner className="w-8 h-8 text-slate-500" />
        </div>
      ) : weather ? (
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center text-slate-500 dark:text-slate-400 mb-2">
              <LocationPinIcon className="w-4 h-4 mr-1" />
              <span className="font-semibold text-sm">{weather.location}</span>
            </div>
            <p className="text-6xl font-extrabold text-slate-800 dark:text-white">
              {weather.temperature}°
            </p>
            <p className="font-semibold text-slate-600 dark:text-slate-300">{weather.condition}</p>
          </div>
          <div className="animate-weather-icon">
            <WeatherIcon condition={weather.condition} />
          </div>
        </div>
      ) : null}
        <style>{`
            @keyframes weather-icon-animation {
                0% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }
            .animate-weather-icon {
                animation: weather-icon-animation 3s ease-in-out infinite;
            }
      `}</style>
    </aside>
  );
};

export default WeatherWidget;
