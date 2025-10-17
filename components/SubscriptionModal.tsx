
import React from 'react';
import type { SubscriptionPlan } from '../types';
import { subscriptionPlans } from '../constants';
import CloseIcon from './icons/CloseIcon';
import CheckIcon from './icons/CheckIcon';
import CrownIcon from './icons/CrownIcon';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'Free' | 'Premium') => void;
}

const PlanCard: React.FC<{ plan: SubscriptionPlan, onSelect: () => void }> = ({ plan, onSelect }) => (
    <div className={`border-2 rounded-xl p-6 relative ${plan.isRecommended ? 'border-gold' : 'border-slate-200 dark:border-slate-700'}`}>
        {plan.isRecommended && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gold text-white px-3 py-1 text-sm font-bold rounded-full flex items-center gap-1">
                <CrownIcon className="w-4 h-4" />
                Recommended
            </div>
        )}
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-4xl font-extrabold my-4">{plan.price.startsWith('$') ? plan.price.split(' ')[0] : plan.price}<span className="text-base font-normal text-slate-500">{plan.price.startsWith('$') ? ' / month' : ''}</span></p>
        <p className="text-sm text-slate-500">{plan.priceYearly}</p>
        <ul className="my-6 space-y-3">
            {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button onClick={onSelect} className={`w-full py-3 font-bold rounded-lg transition-colors ${plan.isRecommended ? 'bg-gold text-white hover:bg-amber-500' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
            {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to Premium'}
        </button>
    </div>
);


const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="relative w-full max-w-3xl bg-white dark:bg-navy rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white"><CloseIcon /></button>
            <div className="p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Upgrade Your Experience</h2>
                    <p className="text-slate-500 dark:text-slate-400">Unlock powerful AI features and an ad-free experience.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {subscriptionPlans.map(plan => (
                        <PlanCard key={plan.name} plan={plan} onSelect={() => onSubscribe(plan.name as 'Free' | 'Premium')} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubscriptionModal;
