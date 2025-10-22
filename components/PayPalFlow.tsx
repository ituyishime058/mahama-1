

import React from 'react';
import PayPalIcon from './icons/PayPalIcon';
import LockIcon from './icons/LockIcon';

interface PayPalFlowProps {
  onSubmit: () => void;
}

const PayPalFlow: React.FC<PayPalFlowProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  }
  
  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg animate-fade-in">
        <div className="text-center border-b border-slate-300 dark:border-slate-700 pb-4">
            <PayPalIcon className="h-8 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Pay with PayPal</p>
            <p className="text-sm font-semibold">Mahama News Hub</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <input 
                type="email" 
                placeholder="Email or mobile number" 
                required 
                className="w-full p-3 bg-white dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 border-transparent focus:border-transparent transition"
            />
            <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full p-3 bg-white dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 border-transparent focus:border-transparent transition"
            />
             <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Log In & Pay
            </button>
            <a href="#" className="block text-center text-sm font-semibold text-blue-600 hover:underline">Forgot password?</a>
        </form>
    </div>
  );
};

export default PayPalFlow;
