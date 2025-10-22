import React from 'react';
import EntertainmentIcon from './icons/EntertainmentIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const talents = [
  { name: 'The Mahama Drummers', description: 'A vibrant troupe performing traditional Rwandan rhythms.', imageUrl: 'https://picsum.photos/seed/talent1/400/300' },
  { name: 'Seraphine the Singer', description: 'A local vocalist known for her powerful and soulful performances.', imageUrl: 'https://picsum.photos/seed/talent2/400/300' },
  { name: 'Kirehe Comedy Club', description: 'A group of comedians bringing laughter to the community.', imageUrl: 'https://picsum.photos/seed/talent3/400/300' },
];

const events = [
    { name: 'Weekly Open Mic Night', description: 'Every Friday at the Community Hall. Sign up to perform!', imageUrl: 'https://picsum.photos/seed/event1/400/300' },
    { name: 'Cultural Dance Festival', description: 'A celebration of diverse cultures through dance, coming next month.', imageUrl: 'https://picsum.photos/seed/event2/400/300' },
    { name: 'Film Screening: "Rwanda Reborn"', description: 'A documentary screening followed by a Q&A with the director.', imageUrl: 'https://picsum.photos/seed/event3/400/300' },
];

const podcast = { title: "Creator's Corner", description: "An interview with The Mahama Drummers about preserving cultural heritage.", duration: "25 min" };
const locations = ["Community Hall Stage", "Youth Center Amphitheater", "Cultural Performance Square"];

const EntertainmentPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/10 rounded-lg">
            <EntertainmentIcon className="w-10 h-10 text-purple-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Entertainment & Talent</h2>
          <p className="text-slate-500 dark:text-slate-400">Celebrating the vibrant culture and creativity of the community.</p>
        </div>
      </header>
      
      <section>
        <h3 className="text-2xl font-bold mb-4">Talent Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {talents.map(talent => (
            <div key={talent.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <img src={talent.imageUrl} alt={talent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{talent.name}</h4>
                <p className="text-sm opacity-90 mt-1 line-clamp-2">{talent.description}</p>
                </div>
            </div>
            ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(event => (
            <div key={event.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{event.name}</h4>
                <p className="text-sm opacity-90 mt-1 line-clamp-2">{event.description}</p>
                </div>
            </div>
            ))}
        </div>
      </section>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-200 dark:bg-purple-700/50 rounded-lg flex items-center justify-center">
                    <EntertainmentIcon className="w-8 h-8 text-purple-600"/>
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
          <h3 className="text-2xl font-bold mb-4">Key Venues</h3>
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

export default EntertainmentPage;