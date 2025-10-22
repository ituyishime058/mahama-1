import React from 'react';
import AgricultureIcon from './icons/AgricultureIcon';

const cropData = [
    { name: 'Maize Cultivation', description: 'A primary staple crop, grown with techniques adapted for local climate.', imageUrl: 'https://picsum.photos/seed/maize/400/300' },
    { name: 'Bean Harvesting', description: 'High-protein beans are crucial for nutrition and are often intercropped with maize.', imageUrl: 'https://picsum.photos/seed/beans/400/300' },
    { name: 'Cassava Processing', description: 'Drought-resistant cassava is a vital food security crop in the region.', imageUrl: 'https://picsum.photos/seed/cassava/400/300' },
    { name: 'Banana Plantations', description: 'Providing both food and income, banana groves are a common sight.', imageUrl: 'https://picsum.photos/seed/banana/400/300' },
];

const techniquesData = [
    { name: 'Hillside Terracing', description: 'Reduces soil erosion and maximizes arable land on steep slopes.', imageUrl: 'https://picsum.photos/seed/terracing/400/300' },
    { name: 'Drip Irrigation', description: 'Water-efficient systems being introduced to combat dry spells and improve yields.', imageUrl: 'https://picsum.photos/seed/irrigation/400/300' },
];

const AgricultureSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <AgricultureIcon className="w-10 h-10 text-green-500" />
        <div>
          <h2 className="text-3xl font-bold">Agriculture Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">The cornerstone of the local economy and food security.</p>
        </div>
      </div>
      
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Key Crops</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {cropData.map(crop => (
                <div key={crop.name} className="group relative rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 aspect-square">
                    <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h4 className="font-bold text-sm">{crop.name}</h4>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Farming Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {techniquesData.map(tech => (
               <div key={tech.name} className="group relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                <img src={tech.imageUrl} alt={tech.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h4 className="font-bold">{tech.name}</h4>
                    <p className="text-xs opacity-80 mt-1">{tech.description}</p>
                </div>
            </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default AgricultureSectorPage;