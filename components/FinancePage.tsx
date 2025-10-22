import React, { useState } from 'react';
import FinanceIcon from './icons/FinanceIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import UserIcon from './icons/UserIcon';

const services = [
  { name: 'Savings Groups (VSLAs)', description: 'Community-managed groups that provide a safe way to save money and access small loans.', imageUrl: 'https://picsum.photos/seed/finance1/400/300' },
  { name: 'Micro-Loan Opportunities', description: 'Access to small business loans to start or grow an enterprise.', imageUrl: 'https://picsum.photos/seed/finance2/400/300' },
  { name: 'Cooperative Directory', description: 'Join agricultural, artisanal, or service cooperatives to pool resources.', imageUrl: 'https://picsum.photos/seed/finance3/400/300' },
];

const podcast = { title: "Dollars and Sense", description: "A financial literacy expert explains the benefits of joining a Village Savings and Loan Association (VSLA).", duration: "19 min" };
const locations = ["Cooperative Union Office", "Microfinance Partner Desk", "Community Bank Branch"];

const FinancePage: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(100);
    const interestRate = 0.05; // 5%
    const term = 12; // months
    const monthlyPayment = (loanAmount * (1 + interestRate)) / term;

  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-teal-500/10 rounded-lg">
            <FinanceIcon className="w-10 h-10 text-teal-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Microfinance & Cooperatives</h2>
          <p className="text-slate-500 dark:text-slate-400">Building economic resilience and opportunities for all.</p>
        </div>
      </header>
      
        <div className="p-6 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center gap-4">
            <UserIcon className="w-8 h-8 text-blue-600 flex-shrink-0"/>
            <div>
                <h4 className="font-bold">Access Personalized Services</h4>
                <p className="text-sm text-blue-800 dark:text-blue-300">Login or create an account to apply for loans, join cooperatives, and manage your savings online.</p>
            </div>
            <button className="ml-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-lg whitespace-nowrap hover:bg-blue-700">Login Now</button>
        </div>

      <section>
        <h3 className="text-2xl font-bold mb-4">Available Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(service => (
            <div key={service.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{service.name}</h4>
                <p className="text-sm opacity-90 mt-1 line-clamp-2">{service.description}</p>
                </div>
            </div>
            ))}
        </div>
      </section>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-200 dark:bg-teal-700/50 rounded-lg flex items-center justify-center">
                    <FinanceIcon className="w-8 h-8 text-teal-600"/>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold">{podcast.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{podcast.description}</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="w-10 h-10 text-deep-red"/>
                </div>
            </div>
        </section>
         <section>
            <h3 className="text-2xl font-bold mb-4">Loan Calculator</h3>
            <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm space-y-3">
                <div>
                    <label htmlFor="loan-amount" className="text-sm font-semibold">Loan Amount: ${loanAmount}</label>
                    <input type="range" id="loan-amount" min="50" max="500" step="10" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full" />
                </div>
                <div className="text-center bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm font-semibold">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold text-deep-red dark:text-gold">${monthlyPayment.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">(for a 12-month term at 5% interest)</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default FinancePage;