import type { WeatherData } from '../types';
import SunnyIcon from '../components/icons/SunnyIcon';
import CloudyIcon from '../components/icons/CloudyIcon';
import RainyIcon from '../components/icons/RainyIcon';

// This is a mock function. In a real application, you would fetch from a weather API.
export const fetchWeather = (lat: number, lon: number): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different weather based on location
      const temp = Math.round(20 + (lat % 10)); // Temp between 20-30
      const conditionSeed = Math.floor(lon % 3);
      let condition: WeatherData['condition'];
      let icon: WeatherData['icon'];

      if (conditionSeed < 1) {
        condition = 'Sunny';
        icon = SunnyIcon;
      } else if (conditionSeed < 2) {
        condition = 'Cloudy';
        icon = CloudyIcon;
      } else {
        condition = 'Rainy';
        icon = RainyIcon;
      }

      resolve({
        locationName: "Current Location", // A real app would reverse geocode
        temperature: temp,
        condition: condition,
        icon: icon,
      });
    }, 1500); // Simulate network delay
  });
};
