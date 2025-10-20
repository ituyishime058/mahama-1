import React from 'react';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75c3.5-1.5 8.5-1.5 12 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 17.25c-3.5 1.5-8.5 1.5-12 0" />
  </svg>
);

export default DnaIcon;
