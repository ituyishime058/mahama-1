
import React from 'react';
import ModernLogo from './icons/ModernLogo';

interface LogoProps extends React.HTMLAttributes<SVGSVGElement> {
    // an interface to make it compatible with svg props
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <ModernLogo {...props} />
  );
};

export default Logo;
