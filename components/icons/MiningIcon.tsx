import React from 'react';

const MiningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20L19 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3l5 5L9 20H4v-5L16 3z" />
  </svg>
);
export default MiningIcon;
