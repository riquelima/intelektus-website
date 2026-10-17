import React from 'react';

export interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number | string;
  color?: string;
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  className?: string;
}

/**
 * Componente oficial de ícones Google Material Design (Material Symbols)
 * Referência: https://github.com/google/material-design-icons
 */
export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 24,
  color,
  fill = false,
  weight = 400,
  className = '',
  style,
  ...props
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-outlined leading-none select-none inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        fontSize: pixelSize,
        width: pixelSize,
        height: pixelSize,
        color: color,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
