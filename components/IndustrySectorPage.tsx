import React from 'react';
import IndustryIcon from './icons/IndustryIcon';

const industries = [
  {
    name: 'Weaving Cooperatives',
    description: "Creating traditional 'agaseke' baskets and other woven goods, preserving culture and providing income.",
    imageUrl: 'https://picsum.photos/seed/weaving/400/300'
  },
  {
    name: 'Tailoring & Textiles',
    description: 'Vocational training centers empower residents with sewing skills for local and regional markets.',
    imageUrl: 'https://picsum.photos/seed/tailoring/400/300'
  },
  {
    name: 'Carpentry Workshop',
    description: 'Producing furniture and construction materials for the community, fostering self-sufficiency.',
    imageUrl: 'https://picsum.photos/seed/carpentry/400/300'
  },
  {
    name: 'Maize Milling Factory',
    description: 'Small-scale industrial sites process local crops, adding value and reducing post-harvest losses.',
    imageUrl: 'https://picsum.photos/seed/milling/400/300'
  },
  {
    name: 'Pottery and Ceramics',
    description: 'Artisans crafting functional and decorative pottery using local clay.',
    imageUrl: 'https://picsum.photos/seed/pottery/400/300'
  },
  {
    name: 'Soap Making Enterprise',
    description: 'A local business creating soap for hygiene and sale, promoting both health and entrepreneurship.',
    imageUrl: 'https://picsum.photos/seed/soap/400/300'
  }
];

const IndustrySectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in bg-white dark:bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg">
            <IndustryIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Industry & Skills</h2>
          <p className="text-slate-500 dark:text-slate-400">Fostering entrepreneurship and creating employment.</p>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industries.map(industry => (
          <div key={industry.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <img src={industry.imageUrl} alt={industry.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold text-lg">{industry.name}</h4>
              <p className="text-sm opacity-90 mt-1">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySectorPage;