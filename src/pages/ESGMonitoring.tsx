import { useState } from 'react';
import { Leaf, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import AlertBadge from '@/components/ui/AlertBadge';
import { sampleESGData } from '@/lib/data/sampleData';
import { type ESGMetrics } from '@/types';

export function ESGMonitoring() {
  const [selectedLoan, setSelectedLoan] = useState<ESGMetrics>(sampleESGData[1]); // Greenwashing case

  const getComplianceIcon = (compliant: boolean) => {
    return compliant ? (
      <CheckCircle className="text-green-500" size={20} />
    ) : (
      <XCircle className="text-red-500" size={20} />
    );
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">ESG Veritas Platform</h1>
        <p className="text-slate-600 mt-2">
          Track ESG performance and detect greenwashing aligned with LMA Green Loan Terms
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Green Loans"
          value="47"
          subtitle="in portfolio"
          icon={Leaf}
          color="green"
        />
        <MetricCard
          title="Compliance Rate"
          value="89%"
          subtitle="LMA aligned"
          color="blue"
        />
        <MetricCard
          title="High Risk"
          value="3"
          subtitle="greenwashing flags"
          color="red"
        />
        <MetricCard
          title="Reporting"
          value="96%"
          subtitle="time reduction"
          color="green"
        />
      </div>

      {/* LMA Green Loan Terms Badge */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <Leaf className="text-green-600" size={24} />
          <div>
            <h3 className="font-semibold text-green-800">LMA Green Loan Terms (Published Jan 9, 2025)</h3>
            <p className="text-sm text-green-700">
              This platform ensures compliance with the latest LMA Green Loan Principles and standardized reporting requirements
            </p>
          </div>
        </div>
      </div>

      {/* Loan Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Green Loan
        </label>
        <div className="grid grid-cols-2 gap-4">
          {sampleESGData.map((loan) => (
            <button
              key={loan.loanId}
              onClick={() => setSelectedLoan(loan)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLoan.loanId === loan.loanId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{loan.borrowerName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  getRiskBadgeColor(loan.greenwashingRisk.riskLevel)
                }`}>
                  {loan.greenwashingRisk.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`flex items-center gap-1 ${
                  loan.greenLoanStatus ? 'text-green-600' : 'text-slate-500'
                }`}>
                  {loan.greenLoanStatus ? '✓' : '○'} Green Status
                </span>
                <span className="text-slate-500">
                  Score: {loan.greenwashingRisk.transparencyScore}/100
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main ESG Dashboard */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Emissions Tracking */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Emissions Performance</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Reported Reduction</p>
                <p className={`text-3xl font-bold ${
                  selectedLoan.emissions.reported >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedLoan.emissions.reported > 0 ? '+' : ''}{selectedLoan.emissions.reported}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Verified Reduction</p>
                <p className={`text-3xl font-bold ${
                  selectedLoan.emissions.verified >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedLoan.emissions.verified > 0 ? '+' : ''}{selectedLoan.emissions.verified}%
                </p>
              </div>
            </div>

            {/* Discrepancy Warning */}
            {Math.abs(selectedLoan.emissions.reported - selectedLoan.emissions.verified) > 10 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-red-600" size={20} />
                  <span className="font-semibold text-red-800">Data Discrepancy Detected</span>
                </div>
                <p className="text-sm text-red-700">
                  Reported emissions reduction differs significantly from verified data. 
                  Variance: {Math.abs(selectedLoan.emissions.reported - selectedLoan.emissions.verified)}%
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Target Reduction</p>
                  <p className="font-medium text-slate-800">{selectedLoan.emissions.targetReduction}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Baseline Year</p>
                  <p className="font-medium text-slate-800">{selectedLoan.emissions.baselineYear}</p>
                </div>
                <div>
                  <p className="text-slate-500">Verified</p>
                  <div className="flex items-center gap-1">
                    {selectedLoan.emissions.verificationDate ? (
                      <>
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="font-medium text-green-700">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500" size={16} />
                        <span className="font-medium text-red-700">No</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Last Verified</p>
                  <p className="font-medium text-slate-800">
                    {selectedLoan.emissions.verificationDate?.toLocaleDateString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Greenwashing Risk Assessment */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Greenwashing Risk Analysis</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Transparency Score</span>
              <span className="text-2xl font-bold text-slate-800">
                {selectedLoan.greenwashingRisk.transparencyScore}/100
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  selectedLoan.greenwashingRisk.transparencyScore >= 70
                    ? 'bg-green-500'
                    : selectedLoan.greenwashingRisk.transparencyScore >= 50
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${selectedLoan.greenwashingRisk.transparencyScore}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full font-semibold text-lg border-2 ${
              getRiskBadgeColor(selectedLoan.greenwashingRisk.riskLevel)
            }`}>
              {selectedLoan.greenwashingRisk.riskLevel.toUpperCase()} RISK
            </span>
          </div>

          {selectedLoan.greenwashingRisk.flags.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700 text-sm mb-2">Risk Flags:</h4>
              {selectedLoan.greenwashingRisk.flags.map((flag, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-slate-700">{flag}</span>
                </div>
              ))}
            </div>
          )}

          {selectedLoan.greenwashingRisk.riskLevel === 'high' && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="font-medium text-red-700 text-sm mb-2">Recommended Actions:</h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>Request corrected emissions data with verification</li>
                <li>Escalate to ESG compliance committee</li>
                <li>Consider suspending green loan status</li>
                <li>Avoid regulatory penalties and reputation risk</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reporting Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Reporting Status</h3>
        
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Frequency</p>
            <p className="font-medium text-slate-800">{selectedLoan.reporting.frequency}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Last Submitted</p>
            <p className="font-medium text-slate-800">
              {selectedLoan.reporting.lastSubmitted?.toLocaleDateString() || 'Never'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Missed Reports</p>
            <p className={`font-medium text-lg ${
              selectedLoan.reporting.missedReports === 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedLoan.reporting.missedReports}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Completeness</p>
            <p className="font-medium text-slate-800">{selectedLoan.reporting.completeness}%</p>
          </div>
        </div>

        {selectedLoan.reporting.missedReports > 0 && (
          <div className="mt-4">
            <AlertBadge
              severity="warning"
              message={`${selectedLoan.reporting.missedReports} report(s) overdue. Immediate submission required to maintain compliance.`}
            />
          </div>
        )}
      </div>

      {/* LMA Compliance Checklist */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">LMA Green Loan Principles Compliance</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-700">Green Loan Principles Framework</span>
            {getComplianceIcon(selectedLoan.lmaCompliance.greenLoanPrinciples)}
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-700">Sustainability Coordinator Appointed</span>
            {getComplianceIcon(selectedLoan.lmaCompliance.sustainabilityCoordinator)}
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-700">Reporting Aligned with Standards</span>
            {getComplianceIcon(selectedLoan.lmaCompliance.reportingAligned)}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            <strong>Overall Compliance Status:</strong>{' '}
            {Object.values(selectedLoan.lmaCompliance).every(v => v) ? (
              <span className="text-green-600 font-medium">✓ Fully Compliant</span>
            ) : (
              <span className="text-red-600 font-medium">✗ Non-Compliant - Action Required</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
