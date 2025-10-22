import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const IndustrySectorPage: React.FC = () => {
  const stats = [
    { label: 'Workshops', value: '25+' },
    { label: 'Primary Trades', value: '5' },
    { label: 'Apprenticeships', value: '150+' },
    { label: 'Products', value: 'Furniture, Crafts' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/ind1/600/400', caption: 'Carpentry workshop in action.' },
    { src: 'https://picsum.photos/seed/ind2/600/400', caption: 'Locally made crafts for sale.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Industry &amp; Crafts</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Developing local industries and skilled trades to create sustainable livelihoods and promote economic self-sufficiency within the community.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Featured Trades</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Carpentry and furniture making.</li>
        <li>Tailoring and textile production.</li>
        <li>Metalworking and welding.</li>
        <li>Handicrafts and artisanal goods.</li>
      </ul>

      <ImageGallery images={images} />
      
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Featured Artisan: Maria K.</h3>
        <p className="text-slate-600 dark:text-slate-400">"The tailoring program gave me the skills to start my own business. I now employ two other women from my community and we create beautiful clothing for local and regional markets. This initiative has changed our lives."</p>
      </div>
    </div>
  );
};

export default IndustrySectorPage;
