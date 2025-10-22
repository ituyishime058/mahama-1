import React from 'react';
import AgricultureIcon from './icons/AgricultureIcon';

const AgricultureSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <AgricultureIcon className="w-12 h-12 text-green-500" />
        <h2 className="text-3xl font-bold">Agriculture Sector</h2>
      </div>
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        <p>The agriculture sector in the region is a cornerstone of the local economy, focusing on sustainable farming practices and crop diversification. Key initiatives include community gardens, farmer training programs, and market access support.</p>
        <h3 className="text-xl font-semibold">Key Areas:</h3>
        <ul>
            <li><strong>Crop Production:</strong> Maize, beans, and vegetables are the primary crops. Efforts are underway to introduce drought-resistant varieties.</li>
            <li><strong>Livestock:</strong> Small-scale livestock farming, including goats and poultry, provides essential protein and income.</li>
            <li><strong>Agribusiness Support:</strong> Training on value addition, financial literacy, and marketing for local farmers.</li>
        </ul>
      </div>
    </div>
  );
};

export default AgricultureSectorPage;
