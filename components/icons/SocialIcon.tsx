import React from 'react';

const SocialIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.566-.166 1.132-.225 1.7-.225.632 0 1.273.069 1.875.225m-3.562 2.962a9.094 9.094 0 01-3.742-.479 3 3 0 014.682-2.72M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 01-2.25-2.25A2.25 2.25 0 0112 8.25s-2.25 1.006-2.25 2.25a2.25 2.25 0 01-2.25 2.25S7.5 12.75 7.5 10.5a2.25 2.25 0 012.25-2.25m3 4.5a2.25 2.25 0 002.25-2.25A2.25 2.25 0 0012 8.25s2.25 1.006 2.25 2.25a2.25 2.25 0 002.25 2.25s-2.25-.994-2.25-2.25m-2.25 2.25c-.632 0-1.273.069-1.875.225" />
  </svg>
);

export default SocialIcon;
