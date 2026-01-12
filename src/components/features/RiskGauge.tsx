import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number; // 0-100
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function RiskGauge({ score, label, size = 'md', showLabel = true }: RiskGaugeProps) {
  const sizeClasses = {
    sm: { container: 'w-32 h-32', text: 'text-2xl', label: 'text-xs' },
    md: { container: 'w-48 h-48', text: 'text-4xl', label: 'text-sm' },
    lg: { container: 'w-64 h-64', text: 'text-5xl', label: 'text-base' },
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return { primary: '#10B981', secondary: '#34D399', bg: '#ECFDF5' };
    if (score < 60) return { primary: '#F59E0B', secondary: '#FBBF24', bg: '#FFFBEB' };
    return { primary: '#EF4444', secondary: '#F87171', bg: '#FEF2F2' };
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Medium Risk';
    return 'High Risk';
  };

  const colors = getRiskColor(score);
  const riskLabel = getRiskLabel(score);
  const sizeStyle = sizeClasses[size];

  // Calculate arc path
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeStyle.container}`}>
        {/* Background circle with gradient */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-30"
          />
          
          {/* Animated progress arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={colors.primary}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${colors.primary}40)`,
            }}
          />
        </svg>

        {/* Center content with glassmorphism */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`
              ${sizeStyle.text} font-bold
              mb-1
            `}
            style={{ color: colors.primary }}
          >
            {score}
          </div>
          <div
            className={`
              ${sizeStyle.label} font-semibold
              px-3 py-1 rounded-full
            `}
            style={{
              backgroundColor: colors.bg,
              color: colors.primary,
            }}
          >
            {riskLabel}
          </div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: colors.primary }}
        />
      </div>
      
      {showLabel && (
        <p className={`mt-4 text-center ${sizeStyle.label} font-semibold text-gray-700`}>
          {label}
        </p>
      )}
    </div>
  );
}
