import React from 'react';
const FinancePage: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Finance Sector</h2>
    <p className="text-slate-600 dark:text-slate-400">Information on financial services, banking, and micro-loan opportunities available to residents and businesses.</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Key Services</h3>
        <ul className="list-disc list-inside space-y-2">
            <li>Savings Accounts</li>
            <li>Small Business Loans</li>
            <li>Financial Literacy Workshops</li>
        </ul>
    </div>
  </div>
);
export default FinancePage;