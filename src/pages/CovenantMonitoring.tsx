import { useState } from 'react';
import { Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '@/components/ui/MetricCard';
import RiskGauge from '@/components/features/RiskGauge';
import AlertBadge from '@/components/ui/AlertBadge';
import { sampleCovenantMonitoring } from '@/lib/data/sampleData';

export function CovenantMonitoring() {
  const [selectedLoan, setSelectedLoan] = useState(sampleCovenantMonitoring[1]); // High risk one

  // Historical data for trend chart
  const historicalData = [
    { month: 'Jul', ratio: 2.8 },
    { month: 'Aug', ratio: 2.9 },
    { month: 'Sep', ratio: 3.0 },
    { month: 'Oct', ratio: 3.1 },
    { month: 'Nov', ratio: 3.15 },
    { month: 'Dec', ratio: 3.2 },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="text-green-500" size={20} />;
    if (trend === 'deteriorating') return <TrendingDown className="text-red-500" size={20} />;
    return <div className="w-5 h-5 bg-slate-300 rounded-full" />;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Covenant Guardian</h1>
        <p className="text-slate-600 mt-2">
          Real-time covenant monitoring with 60-90 day breach prediction
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Portfolio Loans"
          value="247"
          subtitle="actively monitored"
          icon={Shield}
          color="slate"
        />
        <MetricCard
          title="High Risk"
          value="12"
          subtitle="requiring attention"
          color="red"
        />
        <MetricCard
          title="Predicted Breaches"
          value="5"
          subtitle="in next 90 days"
          color="amber"
        />
        <MetricCard
          title="Time Saved"
          value="70%"
          subtitle="vs manual monitoring"
          color="green"
        />
      </div>

      {/* Loan Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Loan to Monitor
        </label>
        <div className="grid grid-cols-2 gap-4">
          {sampleCovenantMonitoring.map((loan: typeof sampleCovenantMonitoring[0]) => (
            <button
              key={loan.loanId}
              onClick={() => setSelectedLoan(loan)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLoan.loanId === loan.loanId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">{loan.borrowerName}</h3>
                  <p className="text-sm text-slate-600">ID: {loan.loanId}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loan.riskScore < 30
                    ? 'bg-green-100 text-green-700'
                    : loan.riskScore < 60
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  Risk: {loan.riskScore}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Monitoring Dashboard */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Risk Gauge */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-center">
          <RiskGauge
            score={selectedLoan.riskScore}
            label="Overall Risk Score"
            size="md"
          />
        </div>

        {/* Breach Prediction */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Breach Prediction</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Probability</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      selectedLoan.breachProbability > 50 ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${selectedLoan.breachProbability}%` }}
                  />
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  {selectedLoan.breachProbability}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Forecast Period</p>
              <p className="text-xl font-semibold text-slate-800">{selectedLoan.forecastPeriod} days</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Recommended Action</p>
              <p className="text-sm text-slate-700">
                {selectedLoan.riskScore > 60 
                  ? 'Schedule immediate intervention meeting with borrower'
                  : 'Continue standard monitoring'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loss Prevention */}
        <div className="bg-green-50 rounded-lg border-2 border-green-200 p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Loss Prevention</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-green-700 mb-1">Potential Loss Avoided</p>
              <p className="text-3xl font-bold text-green-800">$5M-$10M</p>
              <p className="text-xs text-green-600 mt-1">per prevented default</p>
            </div>
            <div className="pt-3 border-t border-green-200">
              <p className="text-sm text-green-700 mb-1">Early Warning Benefit</p>
              <p className="text-sm text-green-800">
                60-90 day advance notice enables proactive negotiation and restructuring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Covenant Details */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Covenant Status</h3>
        <div className="space-y-4">
          {selectedLoan.covenants.map((covenant: typeof selectedLoan.covenants[0], idx: number) => (
            <div key={idx} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-slate-800">{covenant.type}</h4>
                  {getTrendIcon(covenant.trend)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  covenant.cushion > 20
                    ? 'bg-green-100 text-green-700'
                    : covenant.cushion > 10
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {covenant.cushion.toFixed(1)}% cushion
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-slate-500">Current Value</p>
                  <p className="text-lg font-semibold text-slate-800">{covenant.currentValue.toFixed(2)}x</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Covenant Limit</p>
                  <p className="text-lg font-semibold text-slate-800">{covenant.limit.toFixed(2)}x</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Trend</p>
                  <p className={`text-sm font-medium ${
                    covenant.trend === 'improving' 
                      ? 'text-green-600' 
                      : covenant.trend === 'deteriorating' 
                      ? 'text-red-600' 
                      : 'text-slate-600'
                  }`}>
                    {covenant.trend.charAt(0).toUpperCase() + covenant.trend.slice(1)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      covenant.cushion > 20
                        ? 'bg-green-500'
                        : covenant.cushion > 10
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(covenant.currentValue / covenant.limit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">6-Month Trend: Debt/EBITDA</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="ratio" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', r: 6 }}
            />
            {/* Covenant limit line */}
            <Line 
              type="monotone" 
              dataKey={() => 3.5} 
              stroke="#64748B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500 rounded" />
            <span className="text-slate-600">Actual Ratio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-slate-500 rounded border-dashed border border-slate-500" />
            <span className="text-slate-600">Covenant Limit (3.5x)</span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {selectedLoan.alerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Active Alerts</h3>
          {selectedLoan.alerts.map((alert: typeof selectedLoan.alerts[0], idx: number) => (
            <AlertBadge
              key={idx}
              severity={alert.severity}
              message={alert.message}
              timestamp={alert.triggeredDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
