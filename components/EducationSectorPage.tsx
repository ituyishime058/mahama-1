
import React from 'react';
import EducationIcon from './icons/EducationIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const educationServices = [
  { name: 'Primary School Campus', description: 'Providing foundational education for children in the community.', imageUrl: 'https://picsum.photos/seed/edu1/400/300' },
  { name: 'Adult Literacy Classes', description: 'Evening classes offering reading and writing skills for adults.', imageUrl: 'https://picsum.photos/seed/edu2/400/300' },
  { name: 'Vocational Training Center', description: 'Hands-on training in skills like tailoring, carpentry, and IT.', imageUrl: 'https://picsum.photos/seed/edu3/400/300' },
  { name: 'Early Childhood Development Center', description: 'A safe and stimulating environment for pre-school children.', imageUrl: 'https://picsum.photos/seed/edu4/400/300' },
  { name: 'Library & Resource Hub', description: 'Providing access to books, computers, and quiet study areas.', imageUrl: 'https://picsum.photos/seed/edu5/400/300' },
  { name: 'Language Learning Group', description: 'Community members practicing English and other languages.', imageUrl: 'https://picsum.photos/seed/edu6/400/300' },
];

const podcast = { title: "Learning for Life", description: "A teacher shares the importance of adult education and lifelong learning.", duration: "17 min" };
const locations = ["Primary School 1", "Secondary School A", "Vocational Training Center", "Community Library"];

const EducationSectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-sky-500/10 rounded-lg">
            <EducationIcon className="w-10 h-10 text-sky-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Education & Training</h2>
          <p className="text-slate-500 dark:text-slate-400">Empowering the community through knowledge and skills.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationServices.map(service => (
          <div key={service.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20">
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
                <div className="flex-shrink-0 w-16 h-16 bg-sky-200 dark:bg-sky-700/50 rounded-lg flex items-center justify-center">
                    <EducationIcon className="w-8 h-8 text-sky-600"/>
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

export default EducationSectorPage;
