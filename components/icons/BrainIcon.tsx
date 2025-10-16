
import React from 'react';

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7 3a1 1 0 011.707-.707l6 6a1 1 0 01-1.414 1.414L12 8.414V14.5a1 1 0 11-2 0V8.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3zM5 3a1 1 0 000 2h.586l-1.293 1.293a1 1 0 101.414 1.414L7 6.414V14.5a1 1 0 102 0V6.414l1.293 1.293a1 1 0 101.414-1.414L9.414 5H10a1 1 0 100-2H5z" clipRule="evenodd" />
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 6.332a5.98 5.98 0 019.336 0 1 1 0 001.414-1.414 7.98 7.98 0 00-12.164 0 1 1 0 101.414 1.414z" />
  </svg>
);

export default BrainIcon;
