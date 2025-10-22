import React from 'react';
import MiningIcon from './icons/MiningIcon';

const MiningSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <MiningIcon className="w-12 h-12 text-slate-500" />
        <h2 className="text-3xl font-bold">Mining Sector</h2>
      </div>
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        <p>The mining sector presents both opportunities and challenges. While rich in resources, the focus is on promoting responsible and safe mining practices that benefit the local community and minimize environmental impact.</p>
        <h3 className="text-xl font-semibold">Key Areas:</h3>
        <ul>
            <li><strong>Resource Mapping:</strong> Identifying and mapping local mineral resources for sustainable exploitation.</li>
            <li><strong>Safety Training:</strong> Providing essential safety training and equipment for artisanal miners.</li>
            <li><strong>Environmental Protection:</strong> Initiatives to reclaim mined land and manage water resources effectively.</li>
        </ul>
      </div>
    </div>
  );
};

export default MiningSectorPage;
