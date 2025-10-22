import React from 'react';
const EnvironmentPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Environment</h2>
    <p className="text-slate-600 dark:text-slate-400">Learn about our commitment to sustainability and local environmental protection initiatives.</p>
     <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Key Initiatives</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Reforestation Projects</li>
            <li>Waste Management & Recycling Programs</li>
            <li>Clean Water Initiatives</li>
            <li>Environmental Education Workshops</li>
        </ul>
    </div>
  </div>
);
export default EnvironmentPage;