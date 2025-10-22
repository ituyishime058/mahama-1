import React from 'react';

const MarketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5c0-.75-.3-1.425-.8-1.925L5.25 3.75h13.5L11.3 11.575c-.5.5-.8 1.175-.8 1.925V21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 3.75v.008H9V3.75zm6 0v.008H15V3.75z" />
  </svg>
);

export default MarketIcon;
