import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', gradient = false }) => {
  const baseClasses = 'rounded-lg shadow-lg border border-gray-700 p-6';
  const gradientClasses = gradient 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
    : 'bg-gray-800';

  return (
    <div className={`${baseClasses} ${gradientClasses} ${className}`}>
      {children}
    </div>
  );
};