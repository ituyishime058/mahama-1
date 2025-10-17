import React from 'react';
import { innovations } from '../constants';
import SparklesIcon from './icons/SparklesIcon';
import UserIcon from './icons/UserIcon';
import GlobeIcon from './icons/GlobeIcon';
import DataIcon from './icons/DataIcon';

const iconMap: { [key: string]: React.FC<any> } = {
  SparklesIcon,
  UserIcon,
  GlobeIcon,
  DataIcon,
};


const InnovationTimeline: React.FC = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        The Future of News
      </h2>
      <div className="relative container mx-auto px-6 flex flex-col space-y-8">
        <div className="absolute z-0 w-2 h-full bg-slate-200 dark:bg-slate-700 shadow-md inset-0 left-1/2 -ml-1"></div>
        {innovations.map((item, index) => {
          const Icon = iconMap[item.icon];
          const isEven = index % 2 === 0;
          return (
            <div key={item.year} className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-1/2 ${isEven ? 'pr-8' : 'pl-8'}`}>
                <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg ${isEven ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold text-deep-red dark:text-gold">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{item.description}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -ml-6 z-10">
                <div className="bg-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {item.year}
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
