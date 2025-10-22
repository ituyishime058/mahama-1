import React from 'react';

const WorkSkillsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 7.5h3v-3h-3v3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5v-1.5c0-1.5-1.5-2.25-3-2.25h-10.5c-1.5 0-3 .75-3 2.25v1.5z" />
  </svg>
);

export default WorkSkillsIcon;
