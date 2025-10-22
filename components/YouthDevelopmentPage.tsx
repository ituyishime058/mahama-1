import React, { useState } from 'react';
import YouthIcon from './icons/YouthIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import UserIcon from './icons/UserIcon';

const programs = [
    { type: 'Workshop', name: 'Digital Skills Bootcamp', description: 'Learn coding, digital marketing, and graphic design.', imageUrl: 'https://picsum.photos/seed/youth1/400/300' },
    { type: 'Entrepreneurship', name: 'Youth Business Challenge', description: 'Develop your business idea and pitch for seed funding.', imageUrl: 'https://picsum.photos/seed/youth2/400/300' },
    { type: 'Mentorship', name: 'Career Connect', description: 'Get paired with a professional mentor in your field of interest.', imageUrl: 'https://picsum.photos/seed/youth3/400/300' },
    { type: 'Workshop', name: 'Public Speaking & Leadership', description: 'Build confidence and communication skills.', imageUrl: 'https://picsum.photos/seed/youth4/400/300' },
];

const podcast = { title: "Future Forward", description: "A young entrepreneur shares her story of starting a business after attending a youth workshop.", duration: "24 min" };
const locations = ["Youth Center", "Innovation Hub", "Community Library Tech Space"];

const YouthDevelopmentPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'All' | 'Workshop' | 'Entrepreneurship' | 'Mentorship'>('All');
    
    const filteredPrograms = activeTab === 'All' ? programs : programs.filter(p => p.type === activeTab);

  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-cyan-500/10 rounded-lg">
            <YouthIcon className="w-10 h-10 text-cyan-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Kirehe Youth Development</h2>
          <p className="text-slate-500 dark:text-slate-400">Investing in the next generation of leaders and innovators.</p>
        </div>
      </header>
      
      <section>
        <div className="mb-4 border-b border-slate-200 dark:border-slate-700">
            <nav className="-mb-px flex space-x-6">
                {(['All', 'Workshop', 'Entrepreneurship', 'Mentorship'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === tab ? 'border-deep-red text-deep-red' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrograms.map(program => (
            <div key={program.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <img src={program.imageUrl} alt={program.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-2 left-2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded">{program.type}</div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{program.name}</h4>
                <p className="text-sm opacity-90 mt-1 line-clamp-2">{program.description}</p>
                </div>
            </div>
            ))}
        </div>
      </section>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-cyan-200 dark:bg-cyan-700/50 rounded-lg flex items-center justify-center">
                    <YouthIcon className="w-8 h-8 text-cyan-600"/>
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

export default YouthDevelopmentPage;