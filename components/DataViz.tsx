
import React, { useState } from 'react';

const DataViz: React.FC = () => {
  const data = [
    { label: 'Tech', value: 45, color: '#b91c1c' },
    { label: 'Health', value: 25, color: '#d97706' },
    { label: 'Finance', value: 15, color: '#4b5563' },
    { label: 'Politics', value: 15, color: '#6b7280' },
  ];
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let accumulated = 0;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        Interactive Data
      </h2>
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-2">Global Investment Trends 2023</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Analysis of venture capital funding across major sectors this year. Technology continues to dominate, while health-tech sees significant growth.
          </p>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div 
                key={item.label} 
                className={`flex items-center p-2 rounded-md transition-all duration-200 ${hoveredIndex === index ? 'bg-slate-100 dark:bg-slate-700/50' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="font-semibold">{item.label}:</span>
                <span className="ml-auto text-slate-700 dark:text-slate-300">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-48 h-48 cursor-pointer">
            {data.map((item, index) => {
              const startAngle = (accumulated / total) * 360;
              const endAngle = ((accumulated + item.value) / total) * 360;
              const currentAccumulated = accumulated;
              accumulated += item.value;
              
              const largeArcFlag = item.value > total / 2 ? 1 : 0;
              
              const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
              const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
              const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
              const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
              
              const isHovered = hoveredIndex === index;

              return (
                <path 
                  key={item.label} 
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} 
                  fill={item.color}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: '50% 50%',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DataViz;
