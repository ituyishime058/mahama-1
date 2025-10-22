import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface ServiceDetailPageProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ title, onBack, children }) => {
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold text-deep-red dark:text-gold hover:underline mb-4">
        <ChevronLeftIcon className="w-5 h-5" /> Back to Services
      </button>
      {children}
    </div>
  );
};

export default ServiceDetailPage;
