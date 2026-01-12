import { type ReactNode } from 'react';
import { cn } from '../../lib/utils/cn';
import { motion } from 'framer-motion';

export interface CardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  hover?: boolean;
  elevated?: boolean;
}

export function Card({ children, className, header, footer, hover = false, elevated = false }: CardProps) {
  const baseClasses = elevated 
    ? 'card-elevated' 
    : hover 
    ? 'card-hover' 
    : 'card';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(baseClasses, className)}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          {header}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
