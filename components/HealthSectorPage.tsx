
import React from 'react';
import HealthIcon from './icons/HealthIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const healthServices = [
  { name: 'Mahama Health Center', description: 'The main facility for primary and emergency medical care.', imageUrl: 'https://picsum.photos/seed/health1/400/300' },
  { name: 'Maternity Ward', description: 'Providing specialized care for expectant mothers and newborns.', imageUrl: 'https://picsum.photos/seed/health2/400/300' },
  { name: 'Child Vaccination Program', description: 'Regular immunization drives to protect children from preventable diseases.', imageUrl: 'https://picsum.photos/seed/health3/400/300' },
  { name: 'Mental Health Support Group', description: 'Community-led sessions offering psychosocial support.', imageUrl: 'https://picsum.photos/seed/health4/400/300' },
  { name: 'Nutrition Education Workshop', description: 'Teaching families about balanced diets using locally available foods.', imageUrl: 'https://picsum.photos/seed/health5/400/300' },
  { name: 'Mobile Clinic Outreach', description: 'Bringing healthcare services to remote areas of the camp.', imageUrl: 'https://picsum.photos/seed/health6/400/300' },
];

const podcast = { title: "Health Matters", description: "A local nurse discusses preventative healthcare and common health challenges in the community.", duration: "20 min" };
const locations = ["Main Health Center", "Pharmacy", "Nutrition Center", "Zone 5 Health Post"];

const HealthSectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-red-500/10 rounded-lg">
            <HealthIcon className="w-10 h-10 text-red-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Health & Wellness</h2>
          <p className="text-slate-500 dark:text-slate-400">Ensuring a healthy community through accessible care and education.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthServices.map(service => (
          <div key={service.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
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
                <div className="flex-shrink-0 w-16 h-16 bg-red-200 dark:bg-red-700/50 rounded-lg flex items-center justify-center">
                    <HealthIcon className="w-8 h-8 text-red-600"/>
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

export default HealthSectorPage;
