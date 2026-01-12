import { useState } from 'react';
import { Play, CheckCircle, AlertCircle, Clock, Download } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import ComparisonCard from '@/components/features/ComparisonCard';
import { type DueDiligenceCheck, type DueDiligenceReportGuide } from '@/types';
import { sampleLoans } from '@/lib/data/sampleData';

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "ZAR", name: "South African Rand" },
  { code: "KRW", name: "South Korean Won" },
  { code: "THB", name: "Thai Baht" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "BRL", name: "Brazilian Real" }
];

export function DueDiligence() {
  const [selectedLoan, setSelectedLoan] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState<DueDiligenceCheck[]>([]);
  const [report, setReport] = useState<DueDiligenceReportGuide | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const dueDiligenceChecks: Omit<DueDiligenceCheck, 'timestamp'>[] = [
    {
      checkName: 'Credit Risk Assessment',
      status: 'pending',
      details: 'Verifying borrower credit rating and financial health'
    },
    {
      checkName: 'Covenant Compliance',
      status: 'pending',
      details: 'Checking all financial covenants are met as of latest report'
    },
    {
      checkName: 'Security Perfection',
      status: 'pending',
      details: 'Confirming security interests are properly registered'
    },
    {
      checkName: 'Amendment History',
      status: 'pending',
      details: 'Reviewing all modifications and waivers'
    },
    {
      checkName: 'Documentation Review',
      status: 'pending',
      details: 'Verifying all required documents are present and valid'
    }
  ];

  const startDueDiligence = () => {
    if (!selectedLoan) return;

    // Log the trade details
    console.log("Selected Loan:", selectedLoan);
    console.log("Trade Amount:", amount);
    console.log("Currency:", currency);

    setRunning(true);
    setElapsedTime(0);
    setReport(null);

    // Initialize checks
    const initialChecks = dueDiligenceChecks.map(check => ({
      ...check,
      timestamp: new Date()
    }));
    setChecks(initialChecks);

    // Timer for elapsed time
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    // Simulate checks running
    let checkIndex = 0;
    const checkInterval = setInterval(() => {
      if (checkIndex >= dueDiligenceChecks.length) {
        clearInterval(checkInterval);
        clearInterval(timer);
        
        // Generate report
        const finalReport: DueDiligenceReportGuide = {
          tradeId: `TRADE-${Date.now()}`,
          loanId: selectedLoan,
          initiatedBy: 'Demo User',
          initiatedDate: new Date(),
          completionTime: 2,
          checks: initialChecks.map((check, idx) => ({
            ...check,
            status: 'complete',
            result: idx === 1 ? 'warning' : 'pass',
            timestamp: new Date()
          })),
          summary: {
            overallRisk: 'medium',
            recommendation: 'Proceed with trade - minor covenant monitoring required',
            totalCostSaved: 20000,
            timeSaved: '12 days'
          }
        };

        setReport(finalReport);
        setRunning(false);
        return;
      }

      // Update current check to processing
      setChecks(prev => prev.map((check, idx) => 
        idx === checkIndex 
          ? { ...check, status: 'processing' as const }
          : check
      ));

      // After 2 seconds, mark as complete
      setTimeout(() => {
        setChecks(prev => prev.map((check, idx) => 
          idx === checkIndex 
            ? { 
                ...check, 
                status: 'complete' as const,
                result: checkIndex === 1 ? 'warning' as const : 'pass' as const,
                details: checkIndex === 1 
                  ? 'Covenant compliance verified - cushion narrowing, recommend monitoring'
                  : check.details + ' - Verified'
              }
            : check
        ));
      }, 2000);

      checkIndex++;
    }, 2500);
  };

  const getCheckIcon = (check: DueDiligenceCheck) => {
    if (check.status === 'complete') {
      if (check.result === 'pass') return <CheckCircle className="text-green-500" size={20} />;
      if (check.result === 'warning') return <AlertCircle className="text-amber-500" size={20} />;
      if (check.result === 'fail') return <AlertCircle className="text-red-500" size={20} />;
    }
    if (check.status === 'processing') {
      return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-semantic-info/5 via-accent-gold/5 to-semantic-info/5 rounded-2xl blur-3xl" />
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Settlement Due Diligence Accelerator
            </h1>
            <p className="text-lg text-gray-600">
              Automate pre-trade verification and accelerate settlement by 85%
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Settlement Time"
          value="2 hours"
          subtitle="vs 10-14 days traditional"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Cost Savings"
          value="$20K"
          subtitle="per trade on average"
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="LMA Priority"
          value="25%"
          subtitle="settlement improvement goal"
          color="slate"
        />
      </div>

        {/* Comparison Card */}
        <ComparisonCard
          traditional={{
            time: "10-14 days",
            cost: "$15,000-$25,000"
          }}
          syndicateiq={{
            time: "2 hours",
            cost: "$500"
          }}
          savings={{
            time: "85%",
            cost: "$19,500"
          }}
        />

        {/* Trade Setup */}
        <div className="card-elevated p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-accent-gold to-accent-600 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Initiate Due Diligence</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Select Loan for Trade
              </label>
              <select
                value={selectedLoan}
                onChange={(e) => setSelectedLoan(e.target.value)}
                className="input"
                disabled={running}
              >
              <option value="">Choose a loan...</option>
              {sampleLoans.map(loan => (
                <option key={loan.id} value={loan.id}>
                  {loan.basicDetails.borrower} - {loan.basicDetails.currency} {loan.basicDetails.amount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

            {/* Trade Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Enter Trade Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
                disabled={running}
              />
            </div>

            {/* Currency Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Select Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input"
                disabled={running}
              >
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code} — {cur.name}
                </option>
              ))}
            </select>
          </div>

            {/* Trade Preview */}
            {amount && (
              <div className="p-4 bg-gradient-to-r from-semantic-info-50 to-semantic-info-100/50 border-2 border-semantic-info-200 rounded-xl">
                <p className="text-sm font-semibold text-semantic-info-800 uppercase tracking-wider mb-1">
                  Trade Preview
                </p>
                <p className="text-2xl font-bold text-semantic-info-700">
                  {currency} {Number(amount || 0).toLocaleString()}
                </p>
              </div>
            )}

            <button
              onClick={startDueDiligence}
              disabled={!selectedLoan || running}
              className="btn-primary w-full py-3.5 text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
            <Play size={20} />
            {running ? 'Running Verification...' : 'Start Automated Due Diligence'}
          </button>
        </div>
      </div>

        {/* Verification Progress */}
        {checks.length > 0 && (
          <div className="card-elevated p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Verification Progress</h2>
            <div className="text-sm text-slate-600">
              Elapsed Time: <span className="font-mono font-bold">{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="space-y-4">
            {checks.map((check, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  check.status === 'processing' 
                    ? 'border-blue-500 bg-blue-50' 
                    : check.status === 'complete'
                    ? check.result === 'pass'
                      ? 'border-green-200 bg-green-50'
                      : check.result === 'warning'
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-red-200 bg-red-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getCheckIcon(check)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{check.checkName}</h3>
                    <p className="text-sm text-slate-600 mt-1">{check.details}</p>
                  </div>
                  {check.status === 'complete' && (
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      check.result === 'pass' 
                        ? 'bg-green-100 text-green-700'
                        : check.result === 'warning'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {check.result?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* Final Report */}
        {report && (
          <div className="card-elevated p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Due Diligence Report</h2>
                <p className="text-sm text-gray-500">Generated in {report.completionTime} hours</p>
              </div>
              <button className="btn-primary flex items-center gap-2 shadow-md hover:shadow-lg">
                <Download size={18} />
                Download PDF
              </button>
            </div>

            {/* Executive Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Executive Summary</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Overall Risk Assessment</p>
                <span className={`inline-block px-4 py-2 rounded-full font-medium ${
                  report.summary.overallRisk === 'low'
                    ? 'bg-green-100 text-green-700'
                    : report.summary.overallRisk === 'medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {report.summary.overallRisk.toUpperCase()} RISK
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Recommendation</p>
                <p className="font-medium text-slate-800">{report.summary.recommendation}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Completion Time</p>
                <p className="font-medium text-slate-800">{report.completionTime} hours</p>
                <p className="text-xs text-slate-500 mt-1">vs. 10-14 days traditional</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Cost Savings</p>
                <p className="font-medium text-green-600 text-xl">
                  ${report.summary.totalCostSaved.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

            {/* Detailed Findings */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Findings</h3>
              <div className="space-y-3">
                {report.checks.map((check, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    {check.result === 'pass' && (
                      <div className="p-2 bg-semantic-success-100 rounded-lg">
                        <CheckCircle className="text-semantic-success-600" size={20} />
                      </div>
                    )}
                    {check.result === 'warning' && (
                      <div className="p-2 bg-semantic-warning-100 rounded-lg">
                        <AlertCircle className="text-semantic-warning-600" size={20} />
                      </div>
                    )}
                    {check.result === 'fail' && (
                      <div className="p-2 bg-semantic-danger-100 rounded-lg">
                        <AlertCircle className="text-semantic-danger-600" size={20} />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{check.checkName}</p>
                      <p className="text-sm text-gray-600">{check.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
