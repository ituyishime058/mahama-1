import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const EducationSectorPage: React.FC = () => {
  const stats = [
    { label: 'Schools', value: '8' },
    { label: 'Students Enrolled', value: '15,000+' },
    { label: 'Teachers', value: '300+' },
    { label: 'Literacy Rate', value: '85%' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/edu1/600/400', caption: 'Students in a primary school classroom.' },
    { src: 'https://picsum.photos/seed/edu2/600/400', caption: 'Vocational training for young adults.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Education Sector</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Ensuring access to quality education for all ages, from early childhood learning to adult literacy and vocational training programs.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Programs Offered</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Early Childhood Development Centers</li>
        <li>Primary and Secondary Education</li>
        <li>Accelerated Learning Programs</li>
        <li>Vocational and Skills Training</li>
        <li>Adult Literacy and Language Classes</li>
      </ul>

      <ImageGallery images={images} />
    </div>
  );
};

export default EducationSectorPage;
