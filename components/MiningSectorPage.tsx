import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const MiningSectorPage: React.FC = () => {
  const stats = [
    { label: 'Active Mines', value: '3' },
    { label: 'Mineral Types', value: '4+' },
    { label: 'Jobs Created', value: '250+' },
    { label: 'Annual Output (Est.)', value: '$5M' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/mine1/600/400', caption: 'Artisanal mining operation.' },
    { src: 'https://picsum.photos/seed/mine2/600/400', caption: 'Processing raw minerals.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Mining Sector</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        The mining sector in the region focuses on the responsible extraction of valuable minerals, providing crucial employment and economic stimulus.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Key Activities</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Extraction of Coltan, Tin, and Tungsten.</li>
        <li>Training programs for safe and sustainable mining practices.</li>
        <li>Partnerships with international bodies to ensure fair trade.</li>
        <li>Environmental rehabilitation projects for post-mining sites.</li>
      </ul>

      <ImageGallery images={images} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Safety & Environmental Practices</h3>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        We are committed to ensuring the safety of all workers and minimizing our environmental impact. All operations follow strict guidelines.
      </p>
       <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Mandatory use of personal protective equipment (PPE).</li>
        <li>Regular safety drills and training sessions.</li>
        <li>Water recycling programs to reduce consumption.</li>
        <li>Phased land rehabilitation and reforestation initiatives.</li>
      </ul>
    </div>
  );
};

export default MiningSectorPage;
