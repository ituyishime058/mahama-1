import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const chartData = {
  labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
  datasets: [
    {
      label: 'EmergingMarkets',
      data: [10, 30, 25, 50, 45, 70],
      color: '#b91c1c', // deep-red
    },
    {
      label: 'GreenTech',
      data: [5, 15, 40, 35, 60, 80],
      color: '#16a34a', // green-600
    },
    {
      label: 'AI&Automation',
      data: [20, 25, 50, 60, 75, 90],
      color: '#d97706', // gold
    },
  ],
};

const DataDrivenInsights: React.FC = () => {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const { t } = useTranslation();
  const maxValue = 100;

  const pointsToString = (data: number[]) => {
    return data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / maxValue) * 100}`).join(' ');
  };

  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        {t('interactiveData')}
      </h2>
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{t('investmentTrends')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {t('investmentTrendsDesc')}
        </p>
        <div className="h-64 relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map(val => (
                <line key={val} x1="0" x2="100" y1={100 - val} y2={100 - val} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />
            ))}
            
            {/* Data Lines */}
            {chartData.datasets.map(dataset => (
              <polyline
                key={dataset.label}
                fill="none"
                stroke={dataset.color}
                strokeWidth={hoveredSet === dataset.label ? "1.5" : "1"}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsToString(dataset.data)}
                className="transition-all duration-300"
                style={{ opacity: hoveredSet === null || hoveredSet === dataset.label ? 1 : 0.3 }}
              />
            ))}
          </svg>
        </div>
        {/* X-Axis Labels */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
            {chartData.labels.map(label => <span key={label}>{label}</span>)}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
            {chartData.datasets.map(dataset => (
                <div 
                    key={dataset.label}
                    onMouseEnter={() => setHoveredSet(dataset.label)}
                    onMouseLeave={() => setHoveredSet(null)}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: dataset.color}}></div>
                    <span className="text-sm font-semibold">{t(dataset.label)}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DataDrivenInsights;
