import React, { useState, useEffect } from 'react';
import LocationPinIcon from './icons/LocationPinIcon';
import SunnyIcon from './icons/SunnyIcon';
import CloudyIcon from './icons/CloudyIcon';
import RainyIcon from './icons/RainyIcon';

interface WeatherData {
  location: string;
  temperature: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
  high: number;
  low: number;
}

const mockWeatherData: WeatherData = {
  location: 'Accra, Ghana',
  temperature: 31,
  condition: 'Sunny',
  high: 33,
  low: 25,
};

const WeatherIcon: React.FC<{ condition: WeatherData['condition'], className?: string }> = ({ condition, className }) => {
  switch (condition) {
    case 'Sunny':
      return <SunnyIcon className={className} />;
    case 'Cloudy':
      return <CloudyIcon className={className} />;
    case 'Rainy':
      return <RainyIcon className={className} />;
    default:
      return null;
  }
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setTimeout(() => {
      setWeather(mockWeatherData);
    }, 500);
  }, []);

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Weather</h2>
        {weather && (
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <LocationPinIcon className="w-4 h-4 mr-1" />
            <span>{weather.location}</span>
          </div>
        )}
      </div>
      {weather ? (
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 text-gold dark:text-yellow-300">
            <WeatherIcon condition={weather.condition} className="w-16 h-16" />
          </div>
          <div>
            <p className="text-4xl font-bold">{weather.temperature}°C</p>
            <p className="font-semibold text-slate-600 dark:text-slate-300">{weather.condition}</p>
          </div>
          <div className="ml-auto text-sm text-right">
            <p>H: {weather.high}°</p>
            <p>L: {weather.low}°</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-24">
            <p className="text-slate-500">Loading weather...</p>
        </div>
      )}
    </aside>
  );
};

export default WeatherWidget;
