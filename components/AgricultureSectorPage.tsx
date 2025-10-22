import React from 'react';
import KeyStats from './KeyStats';
import ImageGallery from './ImageGallery';

const AgricultureSectorPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Agriculture Sector</h2>
      <p className="mb-6">Details on agriculture and farming.</p>
      <KeyStats stats={[{ label: 'Farms', value: '200+' }, { label: 'Crops', value: 'Maize, Beans' }]} />
      <ImageGallery images={[{ src: 'https://picsum.photos/seed/agri1/400/300', caption: 'Maize fields' }, { src: 'https://picsum.photos/seed/agri2/400/300', caption: 'Local market' }]} />
    </div>
  );
};
export default AgricultureSectorPage;
