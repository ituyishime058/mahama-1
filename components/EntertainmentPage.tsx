import React from 'react';
const EntertainmentPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Entertainment</h2>
    <p className="text-slate-600 dark:text-slate-400">Discover local entertainment, cultural events, and social gatherings.</p>
     <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Venues & Activities</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Community Cinema Nights</li>
            <li>Live Music and Dance Performances</li>
            <li>Cultural Festivals</li>
        </ul>
    </div>
  </div>
);
export default EntertainmentPage;