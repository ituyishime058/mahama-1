import React from 'react';
import LocationPinIcon from './icons/LocationPinIcon';
import SunnyIcon from './icons/SunnyIcon';

const WeatherWidget: React.FC = () => {
  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <LocationPinIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">New York, USA</span>
          </div>
          <p className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">24°C</p>
        </div>
        <div className="text-yellow-500">
            <SunnyIcon className="w-12 h-12" />
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        <p>Sunny with occasional clouds. High of 26°C. Winds at 10 km/h.</p>
      </div>
    </aside>
  );
};

export default WeatherWidget;
