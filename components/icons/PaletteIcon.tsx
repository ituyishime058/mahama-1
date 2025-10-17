import React from 'react';

const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.962 8.962 0 01-4.22-1.076c.214-.08.435-.15.656-.217.22-.068.44-.132.658-.195.44-.13.876-.255 1.31-.371.435-.115.867-.22 1.3-.314.433-.093.863-.176 1.29-.25.428-.073.853-.135 1.275-.184.422-.05.843-.09 1.26-.118.42-.027.836-.04 1.25-.04h.015c.414 0 .825.013 1.235.04.41.028.82.068 1.225.118.405.05.805.11 1.2.184.4.075.79.157 1.18.25.4.095.785.2 1.17.314.4.117.78.256 1.16.371.2.063.4.127.58.195.2.067.4.137.58.217A8.962 8.962 0 0112 21z" />
    </svg>
);

export default PaletteIcon;