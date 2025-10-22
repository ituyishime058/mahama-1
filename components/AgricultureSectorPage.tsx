import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const AgricultureSectorPage: React.FC = () => {
  const stats = [
    { label: 'Farming Co-ops', value: '12' },
    { label: 'Hectares Cultivated', value: '5,000+' },
    { label: 'Main Crops', value: 'Maize, Beans' },
    { label: 'Livestock Projects', value: '5' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/agri1/600/400', caption: 'Community maize harvest.' },
    { src: 'https://picsum.photos/seed/agri2/600/400', caption: 'Modern irrigation techniques.' },
  ];
  
  const plantingGuide = [
    { season: 'Rainy Season (March - May)', crops: 'Maize, Beans, Soybeans. Prepare land in February.' },
    { season: 'Dry Season (June - August)', crops: 'Irrigated vegetables like tomatoes, onions, and cabbage.' },
    { season: 'Short Rains (September - November)', crops: 'Sweet potatoes, Cassava, Quick-maturing bean varieties.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Agriculture Sector</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Fostering food security and economic empowerment through sustainable farming practices, cooperative development, and modern agricultural techniques.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Seasonal Planting Guide</h3>
      <div className="space-y-4 mb-6">
        {plantingGuide.map(guide => (
            <div key={guide.season} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <h4 className="font-bold">{guide.season}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{guide.crops}</p>
            </div>
        ))}
      </div>

      <ImageGallery images={images} />
      
       <h3 className="text-2xl font-bold mt-8 mb-4">Current Initiatives</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Distribution of drought-resistant seeds.</li>
        <li>Training on crop rotation and soil management.</li>
        <li>Development of small-scale irrigation systems.</li>
        <li>Support for poultry and goat farming cooperatives.</li>
      </ul>
    </div>
  );
};

export default AgricultureSectorPage;
