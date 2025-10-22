
import React from 'react';
import UsersIcon from './icons/UsersIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const communityServices = [
  { name: 'Community Hall Meeting', description: 'Regular gatherings for residents to discuss important issues and events.', imageUrl: 'https://picsum.photos/seed/comm1/400/300' },
  { name: "Women's Empowerment Group", description: 'A support network offering skills training and advocacy for women.', imageUrl: 'https://picsum.photos/seed/comm2/400/300' },
  { name: 'Youth Sports League', description: 'Organized football and basketball leagues for young people.', imageUrl: 'https://picsum.photos/seed/comm3/400/300' },
  { name: 'Cultural Performance Troupe', description: 'Preserving and sharing traditional music, dance, and storytelling.', imageUrl: 'https://picsum.photos/seed/comm4/400/300' },
  { name: 'Distribution Center', description: 'Organized distribution of food aid and essential non-food items.', imageUrl: 'https://picsum.photos/seed/comm5/400/300' },
  { name: 'Dispute Resolution Council', description: 'Community elders helping to mediate and resolve local conflicts peacefully.', imageUrl: 'https://picsum.photos/seed/comm6/400/300' },
];

const podcast = { title: "Building Bridges", description: "A community leader speaks on the importance of social cohesion and youth engagement.", duration: "25 min" };
const locations = ["Main Community Hall", "Youth Recreation Center", "Women's Safe Space", "Registration & Services Office"];

const CommunitySectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/10 rounded-lg">
            <UsersIcon className="w-10 h-10 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Community & Social</h2>
          <p className="text-slate-500 dark:text-slate-400">Strengthening social bonds and providing support networks.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityServices.map(service => (
          <div key={service.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
            <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold text-lg">{service.name}</h4>
              <p className="text-sm opacity-90 mt-1 line-clamp-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-indigo-200 dark:bg-indigo-700/50 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-8 h-8 text-indigo-600"/>
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

export default CommunitySectorPage;
