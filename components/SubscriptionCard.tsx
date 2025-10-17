import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface SubscriptionCardProps {
    onClick: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ onClick }) => {
  return (
    <aside className="p-6 rounded-lg shadow-lg text-white relative overflow-hidden bg-gradient-to-r from-gold via-deep-red to-navy" style={{ backgroundSize: '200% 200%' }}>
      <div className="animate-gradient-shift absolute inset-0 bg-gradient-to-r from-gold via-deep-red to-navy" style={{ backgroundSize: '200% 200%' }}></div>
      <div className="relative z-10">
        <SparklesIcon className="w-8 h-8 mb-3 opacity-80" />
        <h2 className="text-2xl font-extrabold mb-2">
          Go Premium
        </h2>
        <ul className="text-sm space-y-1 mb-4 opacity-90 list-disc list-inside">
            <li>Ad-free experience</li>
            <li>Unlimited AI features</li>
            <li>Exclusive content</li>
        </ul>
        <button 
            onClick={onClick}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Subscribe Now
        </button>
      </div>
    </aside>
  );
};

export default SubscriptionCard;
