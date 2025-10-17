import React from 'react';

const OfflineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 01-2.433-2.433M10.5 2.25a10.5 10.5 0 018.25 8.25" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a10.5 10.5 0 01-9-5.25" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3.75 3.75 0 01-3.75 3.75" />
</svg>
);

export default OfflineIcon;
