
import React from 'react';

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.707-.707a2 2 0 012.828 0l.707.707M7.707 4.293l-1.414-1.414a2 2 0 010-2.828l1.414 1.414zm-1.414 8.486l-1.414 1.414a2 2 0 01-2.828 0l1.414-1.414zm1.414 0l.707.707a2 2 0 002.828 0l.707-.707M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

export default GlobeIcon;
