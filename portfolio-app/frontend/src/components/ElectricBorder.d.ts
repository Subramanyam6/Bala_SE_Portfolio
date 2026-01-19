import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const ElectricBorder: React.FC<ElectricBorderProps>;

export default ElectricBorder;
