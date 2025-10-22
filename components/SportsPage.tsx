import React from 'react';
const SportsPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Sports</h2>
    <p className="text-slate-600 dark:text-slate-400">Information on local sports leagues, facilities, and events for all ages.</p>
     <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Available Sports</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Football (Soccer) Leagues</li>
            <li>Basketball Courts and Tournaments</li>
            <li>Volleyball Matches</li>
            <li>Athletics and Running Clubs</li>
        </ul>
    </div>
  </div>
);
export default SportsPage;