import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'glass-lg',
        sizeStyle.padding,
        'relative overflow-hidden',
        'text-white border border-white/20',
        'hover:border-white/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]',
        'transition-all duration-300',
        'h-full flex flex-col'
      )}
    >
      {/* Decorative gradient overlay with glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent rounded-full -mr-20 -mt-20 blur-xl" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/15 to-transparent rounded-full -mr-16 -mt-16" />
      
      <div className="relative flex flex-col h-full">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <h3 className={`${sizeStyle.titleSize} text-white/60 font-semibold uppercase tracking-wider`}>
            {title}
          </h3>
          {Icon && (
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex-shrink-0">
              <Icon size={sizeStyle.iconSize} className="text-cyan-400" />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2 flex-grow">
          <p className={`
            ${sizeStyle.valueSize}
            font-bold tracking-tight text-white
          `}>
            {value}
          </p>
        </div>

        {/* Subtitle and Trend */}
        <div className="flex items-center justify-between mt-auto">
          {subtitle && (
            <p className="text-xs text-white/50 font-medium">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-semibold ${
                  trend.positive ? 'text-cyan-400' : 'text-red-400'
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
