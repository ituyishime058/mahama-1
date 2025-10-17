import React from 'react';

const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797A8.33 8.33 0 0112 2.25c1.153 0 2.243.232 3.223.638z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.897 18.75A8.962 8.962 0 0112 2.25c2.27 0 4.367.868 5.942 2.285a8.963 8.963 0 01-1.296 13.527 8.963 8.963 0 01-4.212 1.634 8.963 8.963 0 01-4.212-1.634A8.962 8.962 0 014.897 18.75z" />
  </svg>
);

export default FireIcon;
