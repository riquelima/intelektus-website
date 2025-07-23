
import React from 'react';

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {}

const LogoIcon: React.FC<LogoIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 2v20" />
    <path d="M12 2a10 10 0 1 0-10 10" />
    <path d="M22 12a10 10 0 1 0-10 10" />
    <path d="M2 12h20" />
    <path d="M12 2a10 10 0 1 1-10 10" />
    <path d="M12 22a10 10 0 1 1 10-10" />
    <path d="M12 2a10 10 0 1 1 10 10" />
    <path d="M22 12a10 10 0 1 1-10-10" />
  </svg>
);

export default LogoIcon;
