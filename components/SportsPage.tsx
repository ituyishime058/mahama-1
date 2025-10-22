import React from 'react';
import SportsIcon from './icons/SportsIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const clubs = [
  { name: 'Mahama FC', description: 'The premier football club of the camp, competing in local leagues.', imageUrl: 'https://picsum.photos/seed/sport1/400/300' },
  { name: 'Kirehe Volley', description: 'A rising volleyball team known for its strong community support.', imageUrl: 'https://picsum.photos/seed/sport2/400/300' },
  { name: 'The Gazelles', description: 'The community\'s competitive women\'s basketball team.', imageUrl: 'https://picsum.photos/seed/sport3/400/300' },
];

const schedule = [
    { teams: 'Mahama FC vs. Gatore United', time: 'Saturday, 4:00 PM', location: 'Main Pitch' },
    { teams: 'The Gazelles vs. Rusumo Queens', time: 'Sunday, 2:00 PM', location: 'Community Court' },
];

const podcast = { title: "Pitch Side", description: "An interview with the captain of Mahama FC about the upcoming season.", duration: "28 min" };
const locations = ["Main Football Pitch", "Community Basketball Court", "Volleyball Training Ground"];

const SportsPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-500/10 rounded-lg">
            <SportsIcon className="w-10 h-10 text-orange-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Sports Hub</h2>
          <p className="text-slate-500 dark:text-slate-400">Following the passion, players, and pride of local sports.</p>
        </div>
      </header>
      
      <section>
        <h3 className="text-2xl font-bold mb-4">Local Clubs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clubs.map(club => (
            <div key={club.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{club.name}</h4>
                <p className="text-sm opacity-90 mt-1 line-clamp-2">{club.description}</p>
                </div>
            </div>
            ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Match Schedule</h3>
        <div className="space-y-3">
            {schedule.map(match => (
                <div key={match.teams} className="p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <p className="font-bold">{match.teams}</p>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold flex gap-4 mt-2 sm:mt-0">
                        <span>{match.time}</span>
                        <span>@ {match.location}</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-200 dark:bg-orange-700/50 rounded-lg flex items-center justify-center">
                    <SportsIcon className="w-8 h-8 text-orange-600"/>
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

export default SportsPage;