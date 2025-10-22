import React from 'react';

interface KeyStatsProps {
  stats: { label: string; value: string }[];
}

const KeyStats: React.FC<KeyStatsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="my-6 grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center">
          <p className="text-2xl font-bold text-deep-red dark:text-gold">{stat.value}</p>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyStats;
