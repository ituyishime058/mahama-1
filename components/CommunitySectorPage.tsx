import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const CommunitySectorPage: React.FC = () => {
  const stats = [
    { label: 'Community Centers', value: '5' },
    { label: 'Active Groups', value: '30+' },
    { label: 'Volunteers', value: '500+' },
    { label: 'Events per Month', value: '15+' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/comm1/600/400', caption: 'A community meeting in progress.' },
    { src: 'https://picsum.photos/seed/comm2/600/400', caption: 'Cultural festival organized by community groups.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Community Services</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Strengthening social cohesion and empowering residents through a network of community centers, support groups, and cultural activities.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Available Services</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Women's and Youth Groups</li>
        <li>Sports and Recreational Activities</li>
        <li>Cultural Heritage Preservation</li>
        <li>Conflict Resolution and Peacebuilding</li>
        <li>Community Leadership Training</li>
      </ul>

      <ImageGallery images={images} />
    </div>
  );
};

export default CommunitySectorPage;
