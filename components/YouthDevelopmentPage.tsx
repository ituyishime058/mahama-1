import React from 'react';
const YouthDevelopmentPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Youth Development</h2>
    <p className="text-slate-600 dark:text-slate-400">Empowering the next generation with skills, sports, and leadership opportunities.</p>
     <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Key Programs</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Mentorship Programs</li>
            <li>Leadership Training</li>
            <li>Arts & Culture Workshops</li>
            <li>Recreational Sports Leagues</li>
        </ul>
    </div>
  </div>
);
export default YouthDevelopmentPage;