
import React from 'react';
import IndustryIcon from './icons/IndustryIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const industries = [
  { name: 'Weaving Cooperatives', description: "Creating traditional 'agaseke' baskets and other woven goods.", imageUrl: 'https://picsum.photos/seed/weaving/400/300' },
  { name: 'Tailoring & Textiles', description: 'Vocational training centers empower residents with sewing skills.', imageUrl: 'https://picsum.photos/seed/tailoring/400/300' },
  { name: 'Carpentry Workshop', description: 'Producing furniture and construction materials for the community.', imageUrl: 'https://picsum.photos/seed/carpentry/400/300' },
  { name: 'Maize Milling Factory', description: 'Small-scale industrial sites process local crops, adding value.', imageUrl: 'https://picsum.photos/seed/milling/400/300' },
  { name: 'Pottery and Ceramics', description: 'Artisans crafting functional and decorative pottery using local clay.', imageUrl: 'https://picsum.photos/seed/pottery/400/300' },
  { name: 'Soap Making Enterprise', description: 'A local business creating soap for hygiene and sale.', imageUrl: 'https://picsum.photos/seed/soap/400/300' }
];

const podcast = { title: "The Entrepreneur's Spirit", description: "Meet the founder of the local soap making enterprise and learn about her journey.", duration: "22 min" };
const locations = ["Vocational Training Center", "Weaving Cooperative Hub", "Artisan Market Stalls"];

const IndustrySectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg">
            <IndustryIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Industry & Skills</h2>
          <p className="text-slate-500 dark:text-slate-400">Fostering entrepreneurship and creating employment.</p>
        </div>
      </header>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industries.map(industry => (
          <div key={industry.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <img src={industry.imageUrl} alt={industry.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold text-lg">{industry.name}</h4>
              <p className="text-sm opacity-90 mt-1 line-clamp-2">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-200 dark:bg-blue-700/50 rounded-lg flex items-center justify-center">
                    <IndustryIcon className="w-8 h-8 text-blue-600"/>
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

export default IndustrySectorPage;
