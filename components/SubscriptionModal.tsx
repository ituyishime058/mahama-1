import React, { useState } from 'react';
import type { SubscriptionPlan } from '../types';
import { subscriptionPlans } from '../constants';
import CloseIcon from './icons/CloseIcon';
import CheckIcon from './icons/CheckIcon';
import CrownIcon from './icons/CrownIcon';
import { useTranslation } from '../hooks/useTranslation';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'Free' | 'Premium', priceDetails: { name: string, price: string }) => void;
}

const PlanCard: React.FC<{ plan: SubscriptionPlan, onSelect: () => void, billingCycle: 'monthly' | 'annually' }> = ({ plan, onSelect, billingCycle }) => {
    const isPremium = plan.name === 'Premium';
    const { t } = useTranslation();
    
    // Parse prices to numbers for calculation
    const monthlyPriceNum = parseFloat(plan.price.replace('$', ''));
    const yearlyPriceNum = parseFloat(plan.priceYearly.replace('$', ''));
    
    const price = billingCycle === 'annually' && isPremium 
        ? `$${(yearlyPriceNum / 12).toFixed(2)}` 
        : plan.price;

    const priceSuffix = isPremium ? ' / month' : '';
    const originalPrice = isPremium && billingCycle === 'annually' ? <span className="line-through text-slate-400 text-lg ml-2">{plan.price}</span> : null;

    return (
        <div className={`border-2 rounded-xl p-6 relative h-full flex flex-col transition-all duration-300 ${plan.isRecommended ? 'border-gold shadow-gold/20 shadow-lg' : 'border-slate-200 dark:border-slate-700'}`}>
            {plan.isRecommended && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gold text-white px-3 py-1 text-sm font-bold rounded-full flex items-center gap-1">
                    <CrownIcon className="w-4 h-4" />
                    Recommended
                </div>
            )}
            <div className="flex-grow">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline my-4">
                    <span className="text-4xl font-extrabold">{price}</span>
                    <span className="text-base font-normal text-slate-500">{priceSuffix}</span>
                    {originalPrice}
                </div>
                {isPremium && billingCycle === 'annually' && <p className="text-sm text-slate-500 -mt-3 mb-4">Billed as {plan.priceYearly} annually.</p>}
                <ul className="my-6 space-y-3">
                    {plan.features.map((featureKey, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{t(featureKey)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={onSelect} className={`w-full py-3 font-bold rounded-lg transition-transform transform ${plan.isRecommended ? 'bg-gold text-white hover:bg-amber-500 hover:scale-105' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to Premium'}
            </button>
        </div>
    );
};


const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    if (!isOpen) return null;

    const handleSelectPlan = (planName: 'Free' | 'Premium') => {
        if (planName === 'Free') {
            onSubscribe('Free', { name: 'Free', price: 'Free' });
            return;
        }
        
        const premiumPlan = subscriptionPlans.find(p => p.name === 'Premium')!;
        const price = billingCycle === 'annually' ? premiumPlan.priceYearly : premiumPlan.price;
        const priceSuffix = billingCycle === 'annually' ? '/year' : '/month';

        onSubscribe('Premium', { name: `Premium (${billingCycle})`, price: `${price}${priceSuffix}` });
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-3xl bg-white dark:bg-navy rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white"><CloseIcon /></button>
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Upgrade Your Experience</h2>
                        <p className="text-slate-500 dark:text-slate-400">Unlock powerful AI features and an ad-free experience.</p>
                    </div>

                    <div className="flex justify-center items-center mb-8">
                        <span className={`font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-deep-red dark:text-gold' : ''}`}>Monthly</span>
                        <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} className={`relative inline-flex items-center h-7 rounded-full w-12 mx-4 transition-colors ${billingCycle === 'annually' ? 'bg-deep-red' : 'bg-slate-300 dark:bg-slate-600'}`}>
                            <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                        <span className={`font-semibold transition-colors ${billingCycle === 'annually' ? 'text-deep-red dark:text-gold' : ''}`}>Annually</span>
                        <span className="ml-2 bg-gold/20 text-gold text-xs font-bold px-2 py-1 rounded-full">Save 15%</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {subscriptionPlans.map(plan => (
                            <PlanCard key={plan.name} plan={plan} onSelect={() => handleSelectPlan(plan.name as 'Free' | 'Premium')} billingCycle={billingCycle} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;