import React from 'react';

const RingLoader: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-5 h-5 animate-spin text-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeOpacity="0.2"
    />
    <path
      d="M12 2 A10 10 0 0 1 22 12"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default RingLoader;