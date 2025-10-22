
import React from 'react';
import AgricultureIcon from './icons/AgricultureIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const agriculturalActivities = [
    { name: 'Maize Cultivation', description: 'A primary staple crop, grown with techniques adapted for local climate.', imageUrl: 'https://picsum.photos/seed/maize/400/300' },
    { name: 'Hillside Terracing', description: 'Reduces soil erosion and maximizes arable land on steep slopes.', imageUrl: 'https://picsum.photos/seed/terracing/400/300' },
    { name: 'Bean Harvesting', description: 'High-protein beans are crucial for nutrition and are often intercropped.', imageUrl: 'https://picsum.photos/seed/beans/400/300' },
    { name: 'Drip Irrigation', description: 'Water-efficient systems being introduced to combat dry spells.', imageUrl: 'https://picsum.photos/seed/irrigation/400/300' },
    { name: 'Cassava Processing', description: 'Drought-resistant cassava is a vital food security crop in the region.', imageUrl: 'https://picsum.photos/seed/cassava/400/300' },
    { name: 'Community Composting', description: 'Organic waste is turned into nutrient-rich compost for better soil fertility.', imageUrl: 'https://picsum.photos/seed/compost/400/300' },
];

const podcast = { title: "Farmer's Diary", description: "A local farmer discusses the impact of new irrigation techniques on crop yields.", duration: "15 min" };
const locations = ["Community Seed Bank", "Demonstration Farm Plot", "Main Produce Market"];

const AgricultureSectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-green-500/10 rounded-lg">
            <AgricultureIcon className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Agriculture Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">The cornerstone of the local economy and food security.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agriculturalActivities.map(activity => (
            <div key={activity.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h4 className="font-bold text-lg">{activity.name}</h4>
                    <p className="text-sm opacity-90 mt-1 line-clamp-2">{activity.description}</p>
                </div>
            </div>
        ))}
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-green-200 dark:bg-green-700/50 rounded-lg flex items-center justify-center">
                    <AgricultureIcon className="w-8 h-8 text-green-600"/>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold">{podcast.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{podcast.description}</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="w-10 h-10 text-deep-red"/>
                </div>
            </div>
        </section>
         <section>
          <h3 className="text-2xl font-bold mb-4">Key Locations</h3>
          <ul className="space-y-2">
            {locations.map(loc => (
                <li key={loc} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm">
                    <LocationPinIcon className="w-5 h-5 text-deep-red"/>
                    <span className="font-semibold">{loc}</span>
                </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AgricultureSectorPage;
