import React, { useState } from 'react';
import type { SubscriptionPlan, SubscriptionTier } from '../types';
import { subscriptionPlans } from '../constants';
import CloseIcon from './icons/CloseIcon';
import CheckIcon from './icons/CheckIcon';
import CrownIcon from './icons/CrownIcon';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: SubscriptionTier;
  onSelectPlan: (plan: SubscriptionTier) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, currentPlan, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-50 dark:bg-navy text-slate-900 dark:text-white rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-10"><CloseIcon /></button>
        
        <div className="p-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold">Upgrade Your News Experience</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">Choose a plan that fits your needs and unlock the full potential of AI-powered journalism.</p>
            </div>

            <div className="flex justify-center items-center gap-4 mb-8">
                <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-deep-red dark:text-gold' : ''}`}>Monthly</span>
                <button
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                    className="w-14 h-8 rounded-full p-1 bg-slate-200 dark:bg-slate-700 flex items-center transition-colors"
                >
                    <div
                        className={`w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md transform transition-transform duration-300 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}
                    ></div>
                </button>
                 <span className={`font-semibold ${billingCycle === 'yearly' ? 'text-deep-red dark:text-gold' : ''}`}>Yearly</span>
                 <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-xs font-bold rounded-full">Save 15%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subscriptionPlans.map(plan => {
                const isCurrent = plan.name === currentPlan;
                const isPremium = plan.name === 'Premium';

                return (
                <div key={plan.name} className={`relative rounded-xl p-8 border-2 flex flex-col transition-all duration-300 ${isPremium ? 'bg-slate-100 dark:bg-slate-800/50' : ''} ${isCurrent ? 'border-deep-red' : 'border-slate-200 dark:border-slate-700'}`}>
                    {plan.isRecommended && <div className="absolute top-0 right-8 -mt-3 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full uppercase">Recommended</div>}
                    {isCurrent && isPremium && <div className="absolute inset-0 rounded-xl animate-glow pointer-events-none"></div>}

                    <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-4">
                        {isPremium && <CrownIcon className="w-7 h-7 text-gold" />}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>
                    
                    <p className="text-4xl font-extrabold my-4">
                        {billingCycle === 'monthly' ? plan.price : plan.priceYearly}
                        <span className="text-base font-medium text-slate-500">{billingCycle === 'monthly' ? '/month' : '/year'}</span>
                    </p>
                    
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        {plan.features.map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <div className="mt-8">
                    {isCurrent ? (
                        <button disabled className="w-full py-3 bg-slate-300 dark:bg-slate-700 text-slate-500 font-bold rounded-lg cursor-not-allowed">
                        Your Current Plan
                        </button>
                    ) : (
                        <button onClick={() => onSelectPlan(plan.name)} className={`w-full py-3 font-bold rounded-lg transition-all transform hover:scale-105 duration-300 ${isPremium ? 'bg-gradient-to-r from-gold to-yellow-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`}>
                        {isPremium ? 'Upgrade Now' : 'Select Plan'}
                        </button>
                    )}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;