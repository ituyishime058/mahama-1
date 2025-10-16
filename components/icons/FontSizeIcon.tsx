import React from 'react';

const FontSizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h3M4 8h2M4 16h2m5-8h10M9 16h10M12 4v16" />
  </svg>
);

export default FontSizeIcon;
