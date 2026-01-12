import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlertBadgeProps {
  severity: 'info' | 'warning' | 'critical' | 'success';
  message: string;
  timestamp?: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AlertBadge({ severity, message, timestamp, action }: AlertBadgeProps) {
  const config = {
    info: {
      icon: Info,
      bgColor: 'bg-semantic-info-50',
      borderColor: 'border-semantic-info-200',
      textColor: 'text-semantic-info-800',
      iconColor: 'text-semantic-info-600',
      iconBg: 'bg-semantic-info-100',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-semantic-warning-50',
      borderColor: 'border-semantic-warning-200',
      textColor: 'text-semantic-warning-800',
      iconColor: 'text-semantic-warning-600',
      iconBg: 'bg-semantic-warning-100',
    },
    critical: {
      icon: AlertCircle,
      bgColor: 'bg-semantic-danger-50',
      borderColor: 'border-semantic-danger-300',
      textColor: 'text-semantic-danger-800',
      iconColor: 'text-semantic-danger-600',
      iconBg: 'bg-semantic-danger-100',
    },
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-semantic-success-50',
      borderColor: 'border-semantic-success-200',
      textColor: 'text-semantic-success-800',
      iconColor: 'text-semantic-success-600',
      iconBg: 'bg-semantic-success-100',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor, iconBg } = config[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        ${bgColor} ${borderColor}
        border-l-4 rounded-lg p-4
        shadow-sm hover:shadow-md
        transition-all duration-200
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          ${iconBg} ${iconColor}
          p-2 rounded-lg flex-shrink-0
        `}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${textColor} font-medium text-sm leading-relaxed`}>
            {message}
          </p>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-1.5">
              {timestamp.toLocaleString()}
            </p>
          )}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium
              ${textColor} ${iconBg}
              hover:opacity-80 transition-opacity
              flex-shrink-0
            `}
          >
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  );
}
