
import React from 'react';
import TourismIcon from './icons/TourismIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const attractions = [
  { name: 'Akagera National Park', description: 'Experience a Big Five safari in this stunning savannah park, a short drive from Kirehe.', imageUrl: 'https://picsum.photos/seed/akagera/600/400' },
  { name: 'Rusumo Falls', description: 'Witness the power of the Kagera River at these historic falls on the Tanzania border.', imageUrl: 'https://picsum.photos/seed/rusumo/600/400' },
  { name: 'Community Cultural Tours', description: 'Engage with local life, visit craft markets, and experience traditional Rwandan culture.', imageUrl: 'https://picsum.photos/seed/culturetour/600/400' },
  { name: 'Lake Muhazi', description: 'A beautiful nearby lake perfect for boat trips, fishing, and relaxing by the shore.', imageUrl: 'https://picsum.photos/seed/muhazi/600/400' },
  { name: 'Imigongo Art Center', description: 'Discover the unique geometric art form traditional to the region.', imageUrl: 'https://picsum.photos/seed/imigongo/600/400'},
  { name: 'Birdwatching Hotspots', description: 'Explore diverse ecosystems home to hundreds of bird species.', imageUrl: 'https://picsum.photos/seed/birdwatching/600/400'},
];

const podcast = { title: "Sounds of the Savannah", description: "A guided audio tour of Akagera National Park, featuring wildlife sounds and expert commentary.", duration: "35 min" };
const locations = ["Akagera Park Entrance", "Rusumo Falls Viewpoint", "Kirehe Cultural Center"];


const TourismPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-amber-500/10 rounded-lg">
          <TourismIcon className="w-10 h-10 text-amber-500" />
        </div>
        <div>
            <h2 className="text-3xl font-bold">Tourism & Culture</h2>
            <p className="text-slate-500 dark:text-slate-400">Discover the natural beauty and rich heritage of the region.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.map(attraction => (
          <div key={attraction.name} className="group relative rounded-xl overflow-hidden shadow-lg h-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
            <img src={attraction.imageUrl} alt={attraction.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h4 className="font-bold text-xl">{attraction.name}</h4>
              <p className="text-sm opacity-90 mt-1 line-clamp-2">{attraction.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-200 dark:bg-amber-700/50 rounded-lg flex items-center justify-center">
                    <TourismIcon className="w-8 h-8 text-amber-600"/>
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

export default TourismPage;
