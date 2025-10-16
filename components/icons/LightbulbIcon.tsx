import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-1.125a6.011 6.011 0 001.125-1.5H9.375m3.375 0a6.01 6.01 0 01-1.5-1.125A6.011 6.011 0 019.375 7.5h3.375m-3.375 0a6.01 6.01 0 00-1.5-1.125A6.011 6.011 0 009.375 4.5h3.375M12 18a2.25 2.25 0 01-2.25-2.25H14.25A2.25 2.25 0 0112 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 01-8.25-8.25c0-2.828 1.459-5.385 3.75-6.855M12 21a8.25 8.25 0 008.25-8.25c0-2.828-1.459-5.385-3.75-6.855" />
  </svg>
);

export default LightbulbIcon;
