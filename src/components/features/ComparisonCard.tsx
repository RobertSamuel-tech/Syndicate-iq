import { motion } from 'framer-motion';
import { X, Check, TrendingDown, TrendingUp } from 'lucide-react';

interface ComparisonData {
  time: string;
  cost: string;
}

interface ComparisonCardProps {
  traditional: ComparisonData;
  syndicateiq: ComparisonData;
  savings: {
    time: string;
    cost: string;
  };
}

export default function ComparisonCard({
  traditional,
  syndicateiq,
  savings
}: ComparisonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-navy/5 to-transparent rounded-full -mr-32 -mt-32" />
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-accent-gold to-accent-600 rounded-full" />
          Traditional vs SyndicateIQ
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Traditional */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-semantic-danger-100 rounded-lg">
                <X className="text-semantic-danger-600" size={20} />
              </div>
              <span className="font-bold text-gray-900">Traditional</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Duration
                </p>
                <p className="text-xl font-bold text-gray-900">{traditional.time}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Cost
                </p>
                <p className="text-xl font-bold text-gray-900">{traditional.cost}</p>
              </div>
              <p className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                Manual checks required
              </p>
            </div>
          </motion.div>

          {/* SyndicateIQ */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gradient-to-br from-semantic-success-50 to-white rounded-xl border-2 border-semantic-success-200 relative overflow-hidden"
          >
            {/* Success badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-semantic-success-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                RECOMMENDED
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-semantic-success-100 rounded-lg">
                <Check className="text-semantic-success-600" size={20} />
              </div>
              <span className="font-bold text-gray-900">SyndicateIQ</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Duration
                </p>
                <p className="text-xl font-bold text-gray-900">{syndicateiq.time}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Cost
                </p>
                <p className="text-xl font-bold text-gray-900">{syndicateiq.cost}</p>
              </div>
              <p className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                Automated verification
              </p>
            </div>
          </motion.div>
        </div>

        {/* Savings Highlight */}
        <div className="bg-gradient-to-r from-semantic-success-50 to-semantic-info-50 rounded-xl p-6 border-2 border-semantic-success-200">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-semantic-success-500 rounded-lg shadow-md">
                <TrendingDown className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Cost Savings
                </p>
                <p className="text-2xl font-bold text-semantic-success-700">{savings.cost}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="flex items-center gap-3">
              <div className="p-3 bg-semantic-info-500 rounded-lg shadow-md">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Time Saved
                </p>
                <p className="text-2xl font-bold text-semantic-info-700">{savings.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
