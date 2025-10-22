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
  }
];

const IndustrySectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <IndustryIcon className="w-10 h-10 text-blue-500" />
        <div>
          <h2 className="text-3xl font-bold">Industry & Skills</h2>
          <p className="text-slate-500 dark:text-slate-400">Fostering entrepreneurship and creating employment.</p>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industries.map(industry => (
          <div key={industry.name} className="group relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img src={industry.imageUrl} alt={industry.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold">{industry.name}</h4>
              <p className="text-xs opacity-80 mt-1">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySectorPage;