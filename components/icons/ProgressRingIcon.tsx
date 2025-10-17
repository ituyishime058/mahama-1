import React from 'react';

const ProgressRingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
    <circle cx="10" cy="10" r="8" strokeWidth="2" stroke="currentColor" opacity="0.2" />
    <circle cx="10" cy="10" r="8" strokeWidth="2" strokeDasharray="50.265" strokeDashoffset="12.566" strokeLinecap="round" className="rotate-[-90deg] origin-center" />
  </svg>
);

export default ProgressRingIcon;
