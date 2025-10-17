import React from 'react';
import DataViz from './DataViz'; // Re-using existing DataViz component

const DataDrivenInsights: React.FC = () => {
  return (
    <section className="my-16">
        <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
            Data Driven Insights
        </h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
            Explore interactive charts and visualizations that break down complex topics and reveal the stories behind the numbers. Our data journalists work to make information accessible and understandable.
        </p>
        <DataViz />
    </section>
  );
};

export default DataDrivenInsights;
