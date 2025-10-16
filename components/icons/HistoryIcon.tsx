import React from 'react';

const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.625 3.75a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25v-16.5zm12.75 0a2.25 2.25 0 00-2.25 2.25v12a2.25 2.25 0 002.25 2.25v-16.5z" />
  </svg>
);

export default HistoryIcon;
