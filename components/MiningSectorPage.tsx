import React from 'react';
import KeyStats from './KeyStats';
import ImageGallery from './ImageGallery';

const MiningSectorPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Mining Sector</h2>
      <p className="mb-6">Information about mining in the region.</p>
      <KeyStats stats={[{ label: 'Mines', value: '12' }, { label: 'Workers', value: '1,500+' }]} />
      <ImageGallery images={[{ src: 'https://picsum.photos/seed/mining1/400/300', caption: 'Open-pit mine' }, { src: 'https://picsum.photos/seed/mining2/400/300', caption: 'Processing plant' }]} />
    </div>
  );
};
export default MiningSectorPage;
