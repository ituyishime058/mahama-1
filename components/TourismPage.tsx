import React from 'react';
const TourismPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Tourism Sector</h2>
    <p className="text-slate-600 dark:text-slate-400">Explore the rich culture, nature, and hospitality of the region.</p>
     <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Attractions</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Cultural Village Tours</li>
            <li>Nature and Wildlife Walks</li>
            <li>Local Craft Markets</li>
        </ul>
    </div>
  </div>
);
export default TourismPage;