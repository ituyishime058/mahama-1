import React from 'react';

const ScienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0v-5.25a.75.75 0 01.75-.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 9.75c0-3.328 2.39-6.32 5.48-7.228a.75.75 0 01.841.492c.24 1.132.887 2.128 1.763 2.856.877.728 1.957 1.258 3.14 1.543a.75.75 0 01.492.841c-.908 3.09-3.9 5.48-7.228 5.48-3.978 0-7.228-3.25-7.228-7.228z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

export default ScienceIcon;
