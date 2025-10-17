import React from 'react';

const ChildIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 21a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

export default ChildIcon;
