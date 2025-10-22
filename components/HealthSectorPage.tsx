import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const HealthSectorPage: React.FC = () => {
  const stats = [
    { label: 'Health Centers', value: '4' },
    { label: 'Medical Staff', value: '50+' },
    { label: 'Patients per month', value: '2,000+' },
    { label: 'Vaccination Rate', value: '95%' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/health1/600/400', caption: 'Main health post in Mahama.' },
    { src: 'https://picsum.photos/seed/health2/600/400', caption: 'A community health worker conducting a check-up.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Health Sector</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Providing comprehensive healthcare services to the community. This includes primary care, maternal health, child nutrition programs, and vaccination campaigns.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Key Services</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Outpatient and Inpatient care</li>
        <li>Maternal and Child Health Services</li>
        <li>Immunization Programs</li>
        <li>Mental Health and Psychosocial Support</li>
        <li>Nutrition Screening and Support</li>
      </ul>

      <ImageGallery images={images} />
    </div>
  );
};

export default HealthSectorPage;
