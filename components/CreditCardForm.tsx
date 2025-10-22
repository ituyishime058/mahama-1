
import React, { useState } from 'react';
import StripeIcon from './icons/StripeIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import LockIcon from './icons/LockIcon';

interface CreditCardFormProps {
  onSubmit: () => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2);
    }
    setExpiry(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="text-sm font-semibold">Card Number</label>
        <input 
          type="text" 
          placeholder="0000 0000 0000 0000" 
          value={cardNumber}
          onChange={handleCardNumberChange}
          required 
          className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"
        />
      </div>
       <div>
        <label className="text-sm font-semibold">Cardholder Name</label>
        <input type="text" placeholder="John Doe" required className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-semibold">Expiry Date</label>
          <input 
            type="text" 
            placeholder="MM / YY" 
            value={expiry}
            onChange={handleExpiryChange}
            required 
            className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-semibold">CVC</label>
          <input type="text" placeholder="123" required className="w-full p-3 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
        </div>
      </div>
      <button type="submit" className="w-full py-3 mt-4 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
        <LockIcon className="w-5 h-5"/> Pay Securely
      </button>
      <div className="flex justify-center items-center gap-1 text-xs text-slate-400 mt-2">
        <span>Powered by</span> <StripeIcon className="h-4 opacity-70"/>
      </div>
    </form>
  );
};

export default CreditCardForm;
