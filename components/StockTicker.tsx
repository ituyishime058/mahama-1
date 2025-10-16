import React from 'react';
import { stockData } from '../constants';

const StockTicker: React.FC = () => {
  const extendedStockData = [...stockData, ...stockData]; // Duplicate for seamless scroll

  return (
    <div className="fixed top-28 z-40 w-full bg-slate-800 dark:bg-navy text-white py-2 overflow-hidden shadow-lg">
      <div className="flex whitespace-nowrap animate-ticker-scroll">
        {extendedStockData.map((stock, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="text-sm font-bold text-slate-300">{stock.symbol}</span>
            <span className="ml-2 text-sm font-mono">{stock.price.toFixed(2)}</span>
            <span className={`ml-2 text-xs font-semibold ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stock.change} ({stock.changePercent})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;