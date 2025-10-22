
import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import CheckIcon from './icons/CheckIcon';
import CreditCardForm from './CreditCardForm';
import PayPalFlow from './PayPalFlow';
import BankTransferFlow from './BankTransferFlow';
import StripeIcon from './icons/StripeIcon';
import PayPalIcon from './icons/PayPalIcon';
import BankIcon from './icons/BankIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan: { name: string, price: string } | null;
}

type PaymentStage = 'selection' | 'card' | 'paypal' | 'bank' | 'processing' | 'success';

const processingMessages = [
    "Initializing payment...",
    "Securing connection...",
    "Sending details to provider...",
    "Awaiting confirmation...",
    "Processing payment...",
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, plan }) => {
  const [stage, setStage] = useState<PaymentStage>('selection');
  const [processingMessage, setProcessingMessage] = useState(processingMessages[0]);
  
  useEffect(() => {
    if (!isOpen) {
      // Reset state after a delay for the closing animation
      const timer = setTimeout(() => {
        setStage('selection');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handlePaymentSubmit = () => {
    setStage('processing');
    let messageIndex = 0;
    const interval = setInterval(() => {
        messageIndex++;
        setProcessingMessage(processingMessages[messageIndex % processingMessages.length]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setStage('success');
      setTimeout(() => {
        onSuccess();
        // Reset state for next time after success animation
        setTimeout(() => setStage('selection'), 500);
      }, 2000);
    }, 4000); // Simulate a 4-second processing time
  };

  if (!isOpen) return null;
  
  const renderContent = () => {
    switch (stage) {
      case 'selection':
        return (
          <>
            <MethodButton icon={<StripeIcon className="h-8" />} label="Credit Card" onClick={() => setStage('card')} />
            <MethodButton icon={<PayPalIcon className="h-7"/>} label="PayPal" onClick={() => setStage('paypal')} />
            <MethodButton icon={<BankIcon className="h-7"/>} label="Bank Account" onClick={() => setStage('bank')} />
          </>
        );
      case 'card':
        return <CreditCardForm onSubmit={handlePaymentSubmit} />;
      case 'paypal':
        return <PayPalFlow onSubmit={handlePaymentSubmit} />;
      case 'bank':
        return <BankTransferFlow onSubmit={handlePaymentSubmit} />;
      case 'processing':
        return (
            <div className="text-center h-full flex flex-col items-center justify-center">
                <LoadingSpinner className="w-12 h-12 text-deep-red" />
                <p className="mt-4 font-semibold text-lg">{processingMessage}</p>
            </div>
        );
      case 'success':
        return (
            <div className="text-center h-full flex flex-col items-center justify-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center animate-pulse">
                    <CheckIcon className="w-12 h-12 text-green-500"/>
                </div>
                <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400">Welcome to Premium. Your access has been upgraded.</p>
            </div>
        );
    }
  };
  
  const MethodButton: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-deep-red dark:hover:border-gold transition-colors">
        {icon}
        <span className="font-bold text-lg">{label}</span>
        <ChevronLeftIcon className="w-6 h-6 ml-auto transform rotate-180 text-slate-400" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md bg-white dark:bg-navy rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-20"><CloseIcon /></button>
        {stage !== 'selection' && stage !== 'success' && stage !== 'processing' && (
            <button onClick={() => setStage('selection')} className="absolute top-4 left-4 text-slate-500 font-semibold flex items-center gap-1 z-20 hover:text-deep-red">
                <ChevronLeftIcon className="w-5 h-5"/> Back
            </button>
        )}
        
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 text-center relative">
            <h2 className="text-2xl font-bold">Complete Your Upgrade</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
                <span className="font-bold text-deep-red dark:text-gold">{plan?.name}</span> plan for <span className="font-bold text-deep-red dark:text-gold">{plan?.price}</span>
            </p>
        </div>
        
        <div className="p-8 space-y-4" style={{ minHeight: '350px' }}>
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
