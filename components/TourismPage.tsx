import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const TourismPage: React.FC = () => {
  const stats = [
    { label: 'Cultural Sites', value: '8' },
    { label: 'Guided Tours', value: '4' },
    { label: 'Annual Visitors', value: '1,200+' },
    { label: 'Local Guides', value: '20+' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/tour1/600/400', caption: 'A guided tour of a local landmark.' },
    { src: 'https://picsum.photos/seed/tour2/600/400', caption: 'Traditional dance performance for visitors.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Tourism &amp; Culture</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Showcasing the rich cultural heritage and natural beauty of the region through community-led tourism initiatives.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Experiences Offered</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Guided nature walks and bird watching.</li>
        <li>Cultural village tours and homestays.</li>
        <li>Traditional cooking classes.</li>
        <li>Craft markets featuring local artisans.</li>
      </ul>

      <ImageGallery images={images} />
      
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Book a Tour</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Interested in experiencing our culture and natural beauty? Fill out the form below to inquire about our tours.</p>
        <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg" />
            <input type="email" placeholder="Your Email" className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg" />
            <textarea placeholder="Your message (e.g., number of people, preferred dates)" rows={3} className="w-full p-2 bg-white dark:bg-slate-800 rounded-lg"></textarea>
            <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
};

export default TourismPage;
