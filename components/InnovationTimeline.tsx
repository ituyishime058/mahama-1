import React from 'react';
import { innovations } from '../constants';
import SparklesIcon from './icons/SparklesIcon';
import UserIcon from './icons/UserIcon';
import GlobeIcon from './icons/GlobeIcon';
import DataIcon from './icons/DataIcon';
import SearchIcon from './icons/SearchIcon';
import GpsIcon from './icons/GpsIcon';
import DnaIcon from './icons/DnaIcon';
import SocialIcon from './icons/SocialIcon';
import SmartphoneIcon from './icons/SmartphoneIcon';
import { useTranslation } from '../hooks/useTranslation';

const iconMap: { [key: string]: React.FC<any> } = {
  SparklesIcon,
  UserIcon,
  GlobeIcon,
  DataIcon,
  SearchIcon,
  GpsIcon,
  DnaIcon,
  SocialIcon,
  SmartphoneIcon,
};


const InnovationTimeline: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-8 text-center border-l-4 border-deep-red pl-4 inline-block">
        {t('innovationTimeline')}
      </h2>
      <div className="relative container mx-auto px-6 flex flex-col space-y-8">
        <div className="absolute z-0 w-2 h-full bg-slate-200 dark:bg-slate-700 shadow-md inset-0 left-1/2 -ml-1"></div>
        {innovations.map((item, index) => {
          const Icon = iconMap[item.icon] || SparklesIcon;
          const isEven = index % 2 === 0;
          return (
            <div key={item.year} className={`relative flex items-center ${isEven ? 'justify-end md:justify-start' : 'justify-end'}`}>
              
              <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg`}>
                  <p className="font-bold text-deep-red dark:text-gold text-right">{item.year}</p>
                  <h3 className="text-xl font-bold">{t(item.titleKey)}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{t(item.descriptionKey)}</p>
                </div>
              </div>

              <div className="absolute left-1/2 -ml-6 z-10">
                <div className="bg-white dark:bg-slate-800 border-4 border-gold text-gold w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InnovationTimeline;