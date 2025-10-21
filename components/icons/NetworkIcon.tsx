import React from 'react';

const NetworkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 12h3a7.5 7.5 0 100-12h-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

export default NetworkIcon;
