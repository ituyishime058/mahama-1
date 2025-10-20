import React from 'react';
import type { WeatherData } from '../types';
import LocationPinIcon from './icons/LocationPinIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface WeatherWidgetProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return (
      <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md flex items-center justify-center h-[170px]">
        <LoadingSpinner className="w-8 h-8" />
        <span className="ml-3 font-semibold">Loading Weather...</span>
      </aside>
    );
  }

  if (!weatherData) {
    return (
      <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md h-[170px] flex items-center justify-center">
        <p className="text-center text-slate-500">Could not retrieve weather data. Please enable location services.</p>
      </aside>
    );
  }

  const Icon = weatherData.icon;

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md h-[170px]">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <LocationPinIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">{weatherData.locationName}</span>
          </div>
          <p className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">{weatherData.temperature}°C</p>
        </div>
        <div className="text-yellow-500">
            <Icon className="w-12 h-12" />
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        <p>Condition: {weatherData.condition}.</p>
      </div>
    </aside>
  );
};

export default WeatherWidget;
