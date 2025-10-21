
import React from 'react';

const ModernLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <clipPath id="circleClip">
        <circle cx="60" cy="60" r="40" />
      </clipPath>
      <style>
        {`
          .ktv-stream {
            animation: ktv-stream-anim 3s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes ktv-stream-anim {
            0% { transform: translateY(120px); }
            40%, 60% { transform: translateY(0); }
            100% { transform: translateY(-120px); }
          }
          .ktv-pulse {
            animation: ktv-pulse-anim 2s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes ktv-pulse-anim {
            0%, 100% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
           .ktv-logo-group:hover .ktv-pulse {
            animation-duration: 0.8s;
          }
          .ktv-logo-group:hover .ktv-stream {
            animation-duration: 1.2s;
          }
          .ktv-logo-group:hover .ktv-letter {
            transform: scale(1.1);
          }
          .ktv-letter {
            font-family: Inter, sans-serif;
            font-size: 60px;
            font-weight: 900;
            fill: #d97706; /* gold */
            transform-origin: center;
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
    </defs>
    
    <g className="ktv-logo-group">
      <g className="ktv-pulse">
        <circle cx="60" cy="60" r="50" className="fill-current text-deep-red/10" />
        <circle cx="60" cy="60" r="55" className="fill-current text-deep-red/5" />
      </g>

      <circle cx="60" cy="60" r="40" className="fill-current text-deep-red" />

      <g clipPath="url(#circleClip)">
        <rect x="0" y="0" width="120" height="120" className="fill-current text-white dark:text-navy" />
        <g className="ktv-stream">
          <rect x="25" y="-10" width="10" height="140" className="fill-current text-deep-red" opacity="0.8" />
          <rect x="55" y="-10" width="10" height="140" className="fill-current text-gold" opacity="0.8" style={{ animationDelay: '0.3s' }} />
          <rect x="85" y="-10" width="10" height="140" className="fill-current text-deep-red" opacity="0.8" style={{ animationDelay: '0.6s' }} />
        </g>
      </g>
      
      <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="ktv-letter">
        K
      </text>
    </g>

  </svg>
);

export default ModernLogo;