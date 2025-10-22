import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const FinancePage: React.FC = () => {
  const stats = [
    { label: 'Microfinance Groups', value: '40+' },
    { label: 'Entrepreneurs Funded', value: '300+' },
    { label: 'Avg. Loan Size', value: '$150' },
    { label: 'Repayment Rate', value: '98%' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/fin1/600/400', caption: 'A small business owner supported by microfinance.' },
    { src: 'https://picsum.photos/seed/fin2/600/400', caption: 'Financial literacy training session.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Finance &amp; Micro-enterprise</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Empowering entrepreneurs and fostering economic independence through microfinance services, business training, and savings groups.
      </p>
      
      <KeyStats stats={stats} />
      
      <h3 className="text-2xl font-bold mt-8 mb-4">Services Offered</h3>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Village Savings and Loan Associations (VSLA).</li>
        <li>Small business startup loans.</li>
        <li>Financial literacy and bookkeeping workshops.</li>
        <li>Business mentorship programs.</li>
      </ul>

      <ImageGallery images={images} />
      
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <blockquote className="border-l-4 border-gold pl-4">
                <p className="italic text-slate-600 dark:text-slate-400">"With a small loan of $100, I was able to buy a sewing machine. Now I have my own tailoring business and can support my family. The financial training was just as valuable as the money."</p>
                <cite className="block font-semibold mt-2 not-italic">- Fatima, Entrepreneur</cite>
            </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
