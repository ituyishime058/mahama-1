import React from 'react';

const AdIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.785c0 1.135.845 2.098 1.976 2.192.32.026.64.049.96.07a24.93 24.93 0 004.024-.166c1.328-.107 2.322-1.14 2.322-2.285V10.5c0-1.145-.994-2.178-2.322-2.285A24.84 24.84 0 0012 8.25zm0 0V6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default AdIcon;
