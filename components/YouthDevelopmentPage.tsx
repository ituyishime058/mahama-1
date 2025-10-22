import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const YouthDevelopmentPage: React.FC = () => {
  const stats = [
    { label: 'Youth Centers', value: '2' },
    { label: 'Members', value: '2,500+' },
    { label: 'Programs', value: '10+' },
    { label: 'Leadership Graduates', value: '200+' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/youth1/600/400', caption: 'Youth leadership workshop.' },
    { src: 'https://picsum.photos/seed/youth2/600/400', caption: 'Coding bootcamp for young aspiring developers.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Youth Development</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Investing in the next generation through leadership training, skills development, mentorship, and positive recreational activities.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Key Programs</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Youth Leadership and Governance Program.</li>
        <li>Digital Skills and Coding Bootcamps.</li>
        <li>Sports for Development leagues.</li>
        <li>Arts and Culture clubs.</li>
        <li>Peer-to-peer mentorship initiatives.</li>
      </ul>

      <ImageGallery images={images} />
      
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Featured Youth Story: John D.</h3>
        <p className="text-slate-600 dark:text-slate-400">"The coding bootcamp at the youth center opened my eyes to a new world. I learned how to build websites and now I do freelance work for small businesses. I hope to become a software engineer one day."</p>
      </div>
    </div>
  );
};

export default YouthDevelopmentPage;
