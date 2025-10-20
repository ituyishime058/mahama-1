import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import PayPalIcon from './icons/PayPalIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import CheckIcon from './icons/CheckIcon';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan: { name: string, price: string };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, plan }) => {
  const [activeTab, setActiveTab] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        // Reset state for next time
        setTimeout(() => {
            setIsSuccess(false);
            setActiveTab('card');
        }, 500);
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md bg-white dark:bg-navy rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-10"><CloseIcon /></button>
        
        {isSuccess ? (
             <div className="p-8 text-center flex flex-col items-center justify-center h-96">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center animate-pulse">
                    <CheckIcon className="w-12 h-12 text-green-500"/>
                </div>
                <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400">Welcome to Premium. Your access has been upgraded.</p>
            </div>
        ) : (
            <>
                <div className="p-8 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold">Complete Your Upgrade</h2>
                    <p className="text-slate-500 dark:text-slate-400">You are subscribing to the <span className="font-bold text-deep-red dark:text-gold">{plan.name}</span> plan for <span className="font-bold text-deep-red dark:text-gold">{plan.price}</span>.</p>
                </div>
                
                <div className="p-8">
                    <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                        <button onClick={() => setActiveTab('card')} className={`flex-1 pb-3 font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'card' ? 'border-deep-red text-deep-red' : 'border-transparent text-slate-500'}`}>
                            <CreditCardIcon /> Credit Card
                        </button>
                        <button onClick={() => setActiveTab('paypal')} className={`flex-1 pb-3 font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'paypal' ? 'border-deep-red text-deep-red' : 'border-transparent text-slate-500'}`}>
                            <PayPalIcon /> PayPal
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {activeTab === 'card' ? (
                            <>
                                <div>
                                    <label className="text-sm font-semibold">Card Number</label>
                                    <input type="text" placeholder="•••• •••• •••• ••••" required className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold">Expiry Date</label>
                                        <input type="text" placeholder="MM / YY" required className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold">CVC</label>
                                        <input type="text" placeholder="•••" required className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                                    </div>
                                </div>
                                 <button type="submit" disabled={isProcessing} className="w-full py-3 mt-4 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105 flex items-center justify-center disabled:bg-slate-400">
                                    {isProcessing && <LoadingSpinner className="mr-2"/>}
                                    {isProcessing ? 'Processing...' : `Pay ${plan.price}`}
                                </button>
                            </>
                        ) : (
                            <div className="text-center">
                                <p className="text-slate-600 dark:text-slate-400 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                                 <button type="submit" disabled={isProcessing} className="w-full py-3 bg-[#0070ba] text-white font-bold rounded-lg hover:bg-[#005ea6] transition-colors transform hover:scale-105 flex items-center justify-center disabled:bg-slate-400">
                                    {isProcessing ? <LoadingSpinner className="mr-2"/> : <PayPalIcon className="mr-2 fill-white"/>}
                                    {isProcessing ? 'Redirecting...' : 'Continue with PayPal'}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
