import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const EnvironmentPage: React.FC = () => {
  const stats = [
    { label: 'Trees Planted', value: '50,000+' },
    { label: 'Recycling Centers', value: '3' },
    { label: 'Clean Energy Projects', value: '8' },
    { label: 'Volunteers', value: '400+' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/env1/600/400', caption: 'Community tree planting day.' },
    { src: 'https://picsum.photos/seed/env2/600/400', caption: 'Solar panel installation on a community building.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Environment &amp; Energy</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Promoting sustainable living and protecting our natural resources through reforestation, waste management, and clean energy initiatives.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Core Projects</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>"One Million Trees" reforestation campaign.</li>
        <li>Community-based waste recycling and composting programs.</li>
        <li>Installation of solar lighting and cooking solutions.</li>
        <li>Environmental education in schools and community centers.</li>
      </ul>

      <ImageGallery images={images} />
      
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
        <h3 className="text-2xl font-bold mb-4">Get Involved!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Join our weekly community clean-up and tree planting events. Every Saturday at 9 AM, meet at Community Center A. Together, we can make a difference.</p>
        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Sign Up to Volunteer</button>
      </div>
    </div>
  );
};

export default EnvironmentPage;
