import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ComponentType<LucideProps>;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const colorConfig = {
  blue: {
    bg: 'bg-gradient-to-br from-semantic-info-50 to-semantic-info-100/50',
    border: 'border-semantic-info-200',
    iconBg: 'bg-semantic-info-500',
    iconColor: 'text-white',
    valueColor: 'text-semantic-info-700',
    titleColor: 'text-semantic-info-600',
  },
  green: {
    bg: 'bg-gradient-to-br from-semantic-success-50 to-semantic-success-100/50',
    border: 'border-semantic-success-200',
    iconBg: 'bg-semantic-success-500',
    iconColor: 'text-white',
    valueColor: 'text-semantic-success-700',
    titleColor: 'text-semantic-success-600',
  },
  amber: {
    bg: 'bg-gradient-to-br from-semantic-warning-50 to-semantic-warning-100/50',
    border: 'border-semantic-warning-200',
    iconBg: 'bg-semantic-warning-500',
    iconColor: 'text-white',
    valueColor: 'text-semantic-warning-700',
    titleColor: 'text-semantic-warning-600',
  },
  red: {
    bg: 'bg-gradient-to-br from-semantic-danger-50 to-semantic-danger-100/50',
    border: 'border-semantic-danger-200',
    iconBg: 'bg-semantic-danger-500',
    iconColor: 'text-white',
    valueColor: 'text-semantic-danger-700',
    titleColor: 'text-semantic-danger-600',
  },
  slate: {
    bg: 'bg-gradient-to-br from-gray-50 to-gray-100/50',
    border: 'border-gray-200',
    iconBg: 'bg-gray-600',
    iconColor: 'text-white',
    valueColor: 'text-gray-900',
    titleColor: 'text-gray-600',
  },
  gold: {
    bg: 'bg-gradient-to-br from-accent-50 to-accent-100/50',
    border: 'border-accent-200',
    iconBg: 'bg-accent-gold',
    iconColor: 'text-white',
    valueColor: 'text-accent-700',
    titleColor: 'text-accent-600',
  },
};

const sizeConfig = {
  sm: {
    padding: 'p-4',
    iconSize: 20,
    valueSize: 'text-2xl',
    titleSize: 'text-xs',
  },
  md: {
    padding: 'p-6',
    iconSize: 24,
    valueSize: 'text-3xl',
    titleSize: 'text-sm',
  },
  lg: {
    padding: 'p-8',
    iconSize: 28,
    valueSize: 'text-4xl',
    titleSize: 'text-base',
  },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'slate',
  size = 'md',
}: MetricCardProps) {
  const config = colorConfig[color];
  const sizeStyle = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`
        ${config.bg} ${config.border}
        ${sizeStyle.padding}
        rounded-xl border-2
        shadow-sm hover:shadow-md
        transition-all duration-300
        relative overflow-hidden
      `}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-16 -mt-16" />
      
      <div className="relative">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <h3 className={`${sizeStyle.titleSize} ${config.titleColor} font-semibold uppercase tracking-wider`}>
            {title}
          </h3>
          {Icon && (
            <div className={`
              ${config.iconBg} ${config.iconColor}
              p-2 rounded-lg shadow-sm
            `}>
              <Icon size={sizeStyle.iconSize} />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <p className={`
            ${sizeStyle.valueSize} ${config.valueColor}
            font-bold tracking-tight
          `}>
            {value}
          </p>
        </div>

        {/* Subtitle and Trend */}
        <div className="flex items-center justify-between">
          {subtitle && (
            <p className="text-xs text-gray-600 font-medium">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-semibold ${
                  trend.positive ? 'text-semantic-success-600' : 'text-semantic-danger-600'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
