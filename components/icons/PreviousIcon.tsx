import React from 'react';

const PreviousIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5v-15" />
  </svg>
);

export default PreviousIcon;
