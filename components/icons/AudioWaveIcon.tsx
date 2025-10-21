
import React from 'react';

const AudioWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="10" width="4" height="10" rx="1">
      <animate attributeName="height" values="10;20;10" begin="0s" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="10;5;10" begin="0s" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="10" y="10" width="4" height="10" rx="1">
      <animate attributeName="height" values="10;20;10" begin="0.2s" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="10;5;10" begin="0.2s" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="18" y="10" width="4" height="10" rx="1">
      <animate attributeName="height" values="10;20;10" begin="0.4s" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="10;5;10" begin="0.4s" dur="1s" repeatCount="indefinite" />
    </rect>
  </svg>
);

export default AudioWaveIcon;
