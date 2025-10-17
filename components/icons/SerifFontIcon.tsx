import React from 'react';

const SerifFontIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16M4 20h16M6 4v16M18 4v16M8 8h8" />
    </svg>
);

export default SerifFontIcon;