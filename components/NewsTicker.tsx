import React from 'react';

interface NewsTickerProps {
  headlines: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ headlines }) => {
  return (
    <div className="bg-deep-red text-white py-2 overflow-hidden shadow-lg">
      <div className="flex whitespace-nowrap animate-ticker-scroll">
        <div className="flex items-center">
          {headlines.map((headline, index) => (
            <React.Fragment key={index}>
              <span className="mx-8 text-sm font-semibold tracking-wide">{headline}</span>
              <span className="text-gold">&#9670;</span>
            </React.Fragment>
          ))}
        </div>
         <div className="flex items-center">
          {headlines.map((headline, index) => (
            <React.Fragment key={`dup-${index}`}>
              <span className="mx-8 text-sm font-semibold tracking-wide">{headline}</span>
              <span className="text-gold">&#9670;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;