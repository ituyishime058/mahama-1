import React from 'react';

const RainyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2.25a.75.75 0 01.75-.75zM10.5 6a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V6.75a.75.75 0 01.75-.75zM10.5 10.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.113 5.25 5.25 0 00-10.233 2.311A4.5 4.5 0 002.25 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5l-1.5-3m3 3l-1.5-3m3 3l-1.5-3m3 3l-1.5-3" />
    </svg>
);

export default RainyIcon;
