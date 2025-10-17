import React from 'react';

const GlassesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.338 4.646a.933.933 0 011.32 0l2.002 2.002a.933.933 0 010 1.32L5.338 11.33a.933.933 0 01-1.32 0L2 8.992a.933.933 0 010-1.32l2.002-2.024a.933.933 0 011.316-.002zM18.662 4.646a.933.933 0 00-1.32 0l-2.002 2.002a.933.933 0 000 1.32l3.324 3.36a.933.933 0 001.32 0L22 8.992a.933.933 0 000-1.32l-2.002-2.024a.933.933 0 00-1.316-.002zM10 12h4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 16H4a1 1 0 00-1 1v2a1 1 0 001 1h16a1 1 0 001-1v-2a1 1 0 00-1-1h-1.5" />
  </svg>
);

export default GlassesIcon;