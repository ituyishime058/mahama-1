import React from 'react';

interface PullQuoteProps {
  quote: string;
}

const PullQuote: React.FC<PullQuoteProps> = ({ quote }) => {
  return (
    <blockquote className="my-8 md:my-12 p-4 border-l-4 border-gold bg-slate-100 dark:bg-slate-800/50 rounded-r-lg relative text-center animate-fade-in-up">
      <p className="text-xl md:text-2xl font-semibold italic text-slate-800 dark:text-slate-200">
        “{quote}”
      </p>
    </blockquote>
  );
};

export default PullQuote;