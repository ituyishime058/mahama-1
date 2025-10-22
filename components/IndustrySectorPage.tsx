import React from 'react';
const IndustrySectorPage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Industry Sector</h2>
    <p className="text-slate-600 dark:text-slate-400">Fostering local industry and manufacturing to create jobs and economic growth.</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Key Areas</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Textile and Garment Production</li>
            <li>Artisanal Crafts</li>
            <li>Small-Scale Manufacturing</li>
        </ul>
    </div>
  </div>
);
export default IndustrySectorPage;