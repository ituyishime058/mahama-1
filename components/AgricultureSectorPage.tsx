import React from 'react';
import AgricultureIcon from './icons/AgricultureIcon';

const agriculturalActivities = [
    { name: 'Maize Cultivation', description: 'A primary staple crop, grown with techniques adapted for local climate.', imageUrl: 'https://picsum.photos/seed/maize/400/300', category: 'Crop' },
    { name: 'Hillside Terracing', description: 'Reduces soil erosion and maximizes arable land on steep slopes.', imageUrl: 'https://picsum.photos/seed/terracing/400/300', category: 'Technique' },
    { name: 'Bean Harvesting', description: 'High-protein beans are crucial for nutrition and are often intercropped with maize.', imageUrl: 'https://picsum.photos/seed/beans/400/300', category: 'Crop' },
    { name: 'Drip Irrigation', description: 'Water-efficient systems being introduced to combat dry spells and improve yields.', imageUrl: 'https://picsum.photos/seed/irrigation/400/300', category: 'Technique' },
    { name: 'Cassava Processing', description: 'Drought-resistant cassava is a vital food security crop in the region.', imageUrl: 'https://picsum.photos/seed/cassava/400/300', category: 'Crop' },
    { name: 'Community Composting', description: 'Organic waste is turned into nutrient-rich compost, improving soil fertility sustainably.', imageUrl: 'https://picsum.photos/seed/compost/400/300', category: 'Technique' },
];

const AgricultureSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in bg-white dark:bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-green-500/10 rounded-lg">
            <AgricultureIcon className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Agriculture Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">The cornerstone of the local economy and food security.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agriculturalActivities.map(activity => (
            <div key={activity.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">{activity.category}</div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h4 className="font-bold text-lg">{activity.name}</h4>
                    <p className="text-sm opacity-90 mt-1">{activity.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AgricultureSectorPage;