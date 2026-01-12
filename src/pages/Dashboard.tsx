import { LayoutDashboard, FileText, TrendingUp, Shield, Leaf, ArrowRight, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MetricCard from '@/components/ui/MetricCard';
import AlertBadge from '@/components/ui/AlertBadge';
import { sampleCovenantMonitoring, sampleESGData } from '@/lib/data/sampleData';

export function Dashboard() {
  const portfolioHealth = 85;
  const totalLoans = 247;
  const activeAlerts = 12;

  // Get high-risk items
  const highRiskLoans = sampleCovenantMonitoring.filter(loan => loan.riskScore > 60);
  const esgFlags = sampleESGData.filter(loan => loan.greenwashingRisk.riskLevel === 'high');

  const moduleCards = [
    {
      to: '/document-processing',
      icon: FileText,
      title: 'Document Intelligence',
      subtitle: '99% faster processing',
      color: 'blue',
      stats: [
        { label: 'Processed This Month', value: '47' },
        { label: 'Time Saved', value: '156 days', highlight: true },
      ],
    },
    {
      to: '/due-diligence',
      icon: TrendingUp,
      title: 'Due Diligence',
      subtitle: '85% faster settlement',
      color: 'green',
      stats: [
        { label: 'Trades This Month', value: '23' },
        { label: 'Cost Saved', value: '$460K', highlight: true },
      ],
    },
    {
      to: '/covenant-monitoring',
      icon: Shield,
      title: 'Covenant Guardian',
      subtitle: '70% time reduction',
      color: 'amber',
      stats: [
        { label: 'High Risk Loans', value: highRiskLoans.length.toString(), highlight: true },
        { label: 'Predicted Breaches', value: '5' },
      ],
    },
    {
      to: '/esg-monitoring',
      icon: Leaf,
      title: 'ESG Veritas',
      subtitle: '96% faster reporting',
      color: 'green',
      stats: [
        { label: 'Green Loans', value: '47' },
        { label: 'High Risk Flags', value: esgFlags.length.toString(), highlight: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/5 via-accent-gold/5 to-primary-navy/5 rounded-2xl blur-3xl" />
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Portfolio Intelligence Hub
            </h1>
            <p className="text-lg text-gray-600">
              Unified dashboard showing real-time insights across all loan operations
            </p>
          </div>
        </motion.div>

        {/* Top Metrics - Professional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Portfolio Health"
            value={`${portfolioHealth}/100`}
            subtitle="Overall score"
            color="green"
            size="md"
          />
          <MetricCard
            title="Total Loans"
            value={totalLoans}
            subtitle="actively monitored"
            icon={LayoutDashboard}
            color="blue"
            size="md"
          />
          <MetricCard
            title="Portfolio Value"
            value="$12.5B"
            subtitle="total facility value"
            color="slate"
            size="md"
          />
          <MetricCard
            title="Active Alerts"
            value={activeAlerts}
            subtitle="require attention"
            color="amber"
            size="md"
          />
        </div>

        {/* Module Status Cards - Enhanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {moduleCards.map((module, idx) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={module.to}>
                  <div className="card-hover p-6 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`
                          p-4 rounded-xl shadow-sm
                          ${module.color === 'blue' ? 'bg-semantic-info-100' :
                            module.color === 'green' ? 'bg-semantic-success-100' :
                            'bg-semantic-warning-100'}
                        `}>
                          <Icon 
                            className={`
                              ${module.color === 'blue' ? 'text-semantic-info-600' :
                                module.color === 'green' ? 'text-semantic-success-600' :
                                'text-semantic-warning-600'}
                            `}
                            size={28} 
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {module.title}
                          </h3>
                          <p className="text-sm font-medium text-gray-500">
                            {module.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-primary-navy transition-colors flex-shrink-0" size={20} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      {module.stats.map((stat, statIdx) => (
                        <div key={statIdx}>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {stat.label}
                          </p>
                          <p className={`
                            text-2xl font-bold
                            ${stat.highlight 
                              ? module.color === 'blue' ? 'text-semantic-info-600' :
                                module.color === 'green' ? 'text-semantic-success-600' :
                                'text-semantic-warning-600'
                              : 'text-gray-900'}
                          `}>
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Alerts - Professional Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Recent Alerts & Actions Required
              </h2>
              <p className="text-sm text-gray-500">
                Priority items requiring immediate attention
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-semantic-danger-100 text-semantic-danger-700 rounded-full text-xs font-semibold">
                {activeAlerts} Active
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {highRiskLoans.slice(0, 2).map((loan) => (
              loan.alerts.map((alert, idx) => (
                <AlertBadge
                  key={`${loan.loanId}-${idx}`}
                  severity={alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'warning' : 'info'}
                  message={`${loan.borrowerName}: ${alert.message}`}
                  timestamp={alert.triggeredDate}
                />
              ))
            ))}
            {esgFlags.slice(0, 1).map((loan) => (
              <AlertBadge
                key={loan.loanId}
                severity="warning"
                message={`${loan.borrowerName}: ${loan.greenwashingRisk.flags[0]}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ROI Summary - Professional Gradient Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-navy via-primary-800 to-primary-900 p-8 lg:p-12 text-white shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-semantic-info-500/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <TrendingUp size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Annual Impact Summary</h2>
                <p className="text-primary-200">Quantified value delivered across all modules</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Time Savings', value: '1,850', unit: 'days annually', icon: TrendingDown },
                { label: 'Cost Reduction', value: '$3.2M', unit: 'per year', icon: TrendingDown },
                { label: 'Loss Prevention', value: '$15M+', unit: 'avoided defaults', icon: Shield },
                { label: 'Efficiency Gain', value: '85%', unit: 'average improvement', icon: TrendingUp },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={20} className="text-accent-gold" />
                      <p className="text-sm font-semibold text-primary-200 uppercase tracking-wider">
                        {metric.label}
                      </p>
                    </div>
                    <p className="text-4xl font-bold mb-1">{metric.value}</p>
                    <p className="text-sm text-primary-300">{metric.unit}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
