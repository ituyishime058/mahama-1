import React from 'react';
import TourismIcon from './icons/TourismIcon';

const attractions = [
  {
    name: 'Akagera National Park',
    description: 'Experience a Big Five safari in this stunning savannah park, a short drive from Kirehe.',
    imageUrl: 'https://picsum.photos/seed/akagera/600/400'
  },
  {
    name: 'Rusumo Falls',
    description: 'Witness the power of the Kagera River at these historic falls on the Tanzania border.',
    imageUrl: 'https://picsum.photos/seed/rusumo/600/400'
  },
  {
    name: 'Community Cultural Tours',
    description: 'Engage with local life, visit craft markets, and experience traditional Rwandan culture firsthand.',
    imageUrl: 'https://picsum.photos/seed/culturetour/600/400'
  },
  {
    name: 'Lake Muhazi',
    description: 'A beautiful nearby lake perfect for boat trips, fishing, and relaxing by the shore.',
    imageUrl: 'https://picsum.photos/seed/muhazi/600/400'
  }
];


const TourismPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <TourismIcon className="w-10 h-10 text-amber-500" />
        <div>
            <h2 className="text-3xl font-bold">Tourism & Culture</h2>
            <p className="text-slate-500 dark:text-slate-400">Discover the natural beauty and rich heritage of the region.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.map(attraction => (
          <div key={attraction.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-transform duration-300 hover:scale-105">
            <img src={attraction.imageUrl} alt={attraction.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h4 className="font-bold text-xl">{attraction.name}</h4>
              <p className="text-sm opacity-90 mt-1">{attraction.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourismPage;