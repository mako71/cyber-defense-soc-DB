import React from 'react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'green' | 'red' | 'blue' | 'yellow';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  color = 'blue',
  icon 
}) => {
  const colorClasses = {
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400'
  };

  const trendClasses = {
    up: 'text-red-400',
    down: 'text-green-400',
    stable: 'text-gray-400'
  };

  return (
    <Card gradient>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color]} mt-2`}>
            {value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <p className={`text-sm mt-2 ${trendClasses[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className={`${colorClasses[color]} opacity-80`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};