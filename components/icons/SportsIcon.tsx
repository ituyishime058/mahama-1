import React from 'react';

const SportsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 01-4.874-1.972A9.75 9.75 0 011.5 12c0-1.407.385-2.735 1.056-3.893m16.888 0c.67 1.158 1.056 2.486 1.056 3.893 0 3.39-1.343 6.44-3.524 8.618M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default SportsIcon;