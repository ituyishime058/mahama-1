import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 ease-in-out hover:rotate-[-5deg] hover:scale-105 active:scale-95"
    {...props}
  >
    <g className="text-slate-800 dark:text-white">
      {/* M shape */}
      <path 
        d="M20 80 L20 20 L40 40 L60 20 L60 80" 
        stroke="currentColor" 
        strokeWidth="10" 
        fill="none" 
        strokeLinejoin="round" 
        strokeLinecap="round"
      />
      {/* H shape connecting part */}
      <path 
        d="M60 50 L80 50"
        stroke="currentColor"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
       {/* Circle for Hub */}
       <circle 
        cx="80" 
        cy="50" 
        r="20" 
        className="text-deep-red dark:text-gold"
        stroke="currentColor"
        strokeWidth="10"
        fill="none"
       />
    </g>
  </svg>
);

export default Logo;