
import React, { useState } from 'react';
import BankIcon from './icons/BankIcon';
import LockIcon from './icons/LockIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface BankTransferFlowProps {
  onSubmit: () => void;
}

const banks = ["Global Trust Bank", "Capital Financial", "Unity Bank", "Apex National"];

const BankTransferFlow: React.FC<BankTransferFlowProps> = ({ onSubmit }) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (selectedBank) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setSelectedBank(null)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <BankIcon className="w-6 h-6"/>
            <h3 className="font-bold text-lg">{selectedBank}</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-sm text-slate-500">Log in to authorize payment.</p>
            <input type="text" placeholder="Username" required className="w-full p-3 bg-white dark:bg-slate-700 rounded-lg"/>
            <input type="password" placeholder="Password" required className="w-full p-3 bg-white dark:bg-slate-700 rounded-lg"/>
            <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                Authorize Payment
            </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="font-semibold text-center mb-2">Select your bank</h3>
      {banks.map(bank => (
        <button 
          key={bank} 
          onClick={() => setSelectedBank(bank)}
          className="w-full text-left p-3 font-semibold bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {bank}
        </button>
      ))}
    </div>
  );
};

export default BankTransferFlow;
