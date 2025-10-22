import React from 'react';

const ScrollIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125V4.875z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75v16.5M16.5 3.75v16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5" />
  </svg>
);

export default ScrollIcon;