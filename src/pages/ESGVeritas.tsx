import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Download, AlertCircle, Shield, Plus, FileJson, FileDown, Clock, User, Hash, Eye, TrendingUp, Database, Search, FileCheck } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { type ESGVerificationResult } from '@/types';
import { calculateGreenwashingRisk, type ESGVerificationData } from '@/lib/utils/calculateGreenwashingRisk';
import { sampleLoans } from '@/lib/data/sampleData';
import RiskGauge from '@/components/features/RiskGauge';
import AlertBadge from '@/components/ui/AlertBadge';
import MetricCard from '@/components/ui/MetricCard';
import { generateHash } from '@/lib/utils/generateHash';

type ProcessingStep = 'idle' | 'uploading' | 'processing' | 'validating' | 'verifying' | 'detecting' | 'mapping' | 'scoring' | 'complete';

interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  loanId?: string;
  documentHash: string;
  details?: Record<string, unknown>;
}

interface LMACriteria {
  id: string;
  principle: string;
  category: 'use-of-proceeds' | 'evaluation' | 'management' | 'reporting';
  status: 'pass' | 'partial' | 'fail';
  evidence?: string;
  notes?: string;
}

export function ESGVeritas() {
  const [selectedLoan, setSelectedLoan] = useState<string>('');
  const [newLoanName, setNewLoanName] = useState('');
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');
  const [processingTime, setProcessingTime] = useState(0);
  const [verificationResult, setVerificationResult] = useState<ESGVerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [extractedMetrics, setExtractedMetrics] = useState<Record<string, unknown> | null>(null);
  const [lmaCompliance, setLmaCompliance] = useState<LMACriteria[]>([]);

  // Add audit log entry
  const addAuditLog = (action: string, details?: Record<string, unknown>) => {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      action,
      user: 'Current User', // In real app, get from auth context
      loanId: selectedLoan || undefined,
      documentHash: selectedFile ? generateHash(selectedFile.name + selectedFile.size) : '',
      details,
    };
    setAuditLog(prev => [entry, ...prev]);
  };

  // Step 1: File Upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      
      // Validate file
      if (file.size > 50 * 1024 * 1024) {
        setError('File size exceeds 50MB limit');
        return;
      }
      
      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.type)) {
        setError('Invalid file type. Please upload PDF or Excel files.');
        return;
      }
      
      setSelectedFile(file);
    setError(null);
      addAuditLog('Document uploaded', { fileName: file.name, fileSize: file.size, fileType: file.type });
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  // Create new loan
  const handleCreateLoan = () => {
    if (!newLoanName.trim()) {
      setError('Please enter a loan name');
      return;
    }
    const newLoanId = `loan-${Date.now()}`;
    setSelectedLoan(newLoanId);
    setShowCreateLoan(false);
    addAuditLog('New loan created', { loanName: newLoanName, loanId: newLoanId });
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (!verificationResult) return;
    const dataStr = JSON.stringify(verificationResult, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `esg-verification-${verificationResult.id}.json`;
    link.click();
    addAuditLog('Report exported (JSON)', { reportId: verificationResult.id });
  };

  // Export to PDF (simulated - in real app, use a PDF library)
  const handleExportPDF = () => {
    if (!verificationResult) return;
    // In a real app, generate PDF using jsPDF or similar
    alert('PDF export functionality would generate a formatted report here');
    addAuditLog('Report exported (PDF)', { reportId: verificationResult.id });
  };

  // Step 2-9: Complete Processing Flow
  const startVerification = async () => {
    if (!selectedLoan || !selectedFile) {
      setError('Please select a loan and upload a file');
      return;
    }

    setError(null);
    const startTime = Date.now();

    // Step 1: Upload
    setProcessingStep('uploading');
    addAuditLog('Verification started', { loanId: selectedLoan, fileName: selectedFile.name });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Document Processing (AI Extraction)
    setProcessingStep('processing');
    const processingTimer = setInterval(() => {
      setProcessingTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate extracted metrics
    const mockExtracted = {
      carbonReduction: "32%",
      renewableUsage: "87%",
      verification: "Approved",
      audit: "Passed",
      waterUsage: "5M liters",
      wasteRecycling: "75%",
      diversity: "40%",
      emissions: {
        scope1: 12000,
        scope2: 8500,
        scope3: null,
      },
    };
    setExtractedMetrics(mockExtracted);
    addAuditLog('Document processed - 47 ESG metrics extracted', { metricsCount: 47 });

    // Step 3: ESG Validation
    setProcessingStep('validating');
    await new Promise(resolve => setTimeout(resolve, 1500));
    addAuditLog('ESG validation completed', { completeness: '74%', missingMetrics: 12 });

    // Step 4: Third-Party Verification
    setProcessingStep('verifying');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addAuditLog('Third-party verification completed', { sources: ['CDP', 'GRI', 'ISO', 'Companies House'] });

    // Step 5: Greenwashing Detection
    setProcessingStep('detecting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    addAuditLog('Greenwashing detection analysis completed');

    // Step 6: LMA Compliance Mapping
    setProcessingStep('mapping');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockLMA: LMACriteria[] = [
      { id: '1', principle: 'Use of Proceeds', category: 'use-of-proceeds', status: 'partial', evidence: 'Partial documentation', notes: 'Missing detailed allocation breakdown' },
      { id: '2', principle: 'Project Evaluation', category: 'evaluation', status: 'pass', evidence: 'ESG assessment completed', notes: 'Comprehensive evaluation performed' },
      { id: '3', principle: 'Management of Proceeds', category: 'management', status: 'fail', evidence: 'No dedicated account', notes: 'Proceeds not tracked separately' },
      { id: '4', principle: 'Reporting', category: 'reporting', status: 'partial', evidence: 'Annual reports provided', notes: 'Missing quarterly updates' },
    ];
    setLmaCompliance(mockLMA);
    addAuditLog('LMA compliance mapping completed', { compliant: 1, partial: 2, failed: 1 });

    // Step 7: Risk Scoring
    setProcessingStep('scoring');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Risk Calculation
    const verificationData: ESGVerificationData = {
      claimedMetrics: {
        carbonReduction: -40,
        renewableEnergy: 85,
        waterReduction: 30,
        wasteRecycling: 75,
      },
      verifiedMetrics: {
        carbonReduction: 5,
        renewableEnergy: 82,
        waterReduction: 28,
        wasteRecycling: 72,
      },
      totalMetrics: 47,
      providedMetrics: 35,
      hasScope3: false,
      hasBaseline: false,
      hasMethodology: false,
      thirdPartyAuditType: 'none',
      hasThirdPartyAudit: false,
      certifications: [
        { type: 'ISO 14001', expired: true, valid: false },
      ],
      historicalData: [
        { year: 2022, metrics: { carbonReduction: -10, renewableEnergy: 70 } },
        { year: 2023, metrics: { carbonReduction: -5, renewableEnergy: 75 } },
      ],
      peerAverage: {
        carbonReduction: -12,
        renewableEnergy: 65,
        waterReduction: 15,
        wasteRecycling: 60,
      },
      peerStdDev: {
        carbonReduction: 8,
        renewableEnergy: 10,
        waterReduction: 5,
        wasteRecycling: 8,
      },
    };

    const riskCalculation = calculateGreenwashingRisk(verificationData);
    clearInterval(processingTimer);

    // Generate Alerts
    const alerts = [];
    const carbonDeviation = Math.abs(verificationData.claimedMetrics.carbonReduction as number - (verificationData.verifiedMetrics.carbonReduction as number));
    if (carbonDeviation > 15) {
      alerts.push({
        id: 'alert-1',
        severity: 'critical' as const,
        title: 'Major emissions data discrepancy',
        description: `Borrower claimed ${verificationData.claimedMetrics.carbonReduction}% reduction, verified shows ${verificationData.verifiedMetrics.carbonReduction}% change. Deviation: ${carbonDeviation}%`,
        estimatedLiability: 500000,
        currency: 'EUR',
        recommendedAction: 'Request corrected data immediately',
        notify: ['Compliance Manager', 'Loan Officer'],
        priority: 1,
        timeline: 'Immediate',
      });
    }

    if (verificationData.certifications.some(c => c.expired)) {
      alerts.push({
        id: 'alert-2',
        severity: 'high' as const,
        title: 'ISO 14001 certification expired',
        description: 'Borrower claims still reference 2023 certification which has expired',
        recommendedAction: 'Request renewal proof or remove claim',
        notify: ['Loan Officer'],
        priority: 2,
        timeline: '7 days',
      });
    }

    if (!verificationData.hasScope3) {
      alerts.push({
        id: 'alert-3',
        severity: 'medium' as const,
        title: 'Incomplete emissions reporting',
        description: 'Scope 3 emissions not reported (LMA requirement)',
        recommendedAction: 'Request full emissions disclosure',
        notify: ['Loan Officer'],
        priority: 3,
        timeline: '30 days',
      });
    }

    // Create comparison data
    const comparison = Object.keys(verificationData.claimedMetrics).map(key => {
      const claimed = verificationData.claimedMetrics[key];
      const verified = verificationData.verifiedMetrics[key] || 0;
      const deviation = typeof claimed === 'number' && typeof verified === 'number' 
        ? Math.abs(claimed - verified) 
        : 0;
      const status = deviation > 15 ? 'critical' : deviation > 10 ? 'major' : deviation > 5 ? 'minor' : 'match';
      
      return {
        metric: key,
        claimed: typeof claimed === 'number' ? `${claimed}%` : claimed,
        verified: typeof verified === 'number' ? `${verified}%` : verified,
        deviation,
        status,
      };
    });

    // Create final result
    const result: ESGVerificationResult = {
      id: `ESG-${Date.now()}`,
      loanId: selectedLoan,
      borrowerName: sampleLoans.find(l => l.id === selectedLoan)?.basicDetails.borrower || newLoanName || 'Unknown',
      uploadedAt: new Date(),
      processedAt: new Date(),
      processingTime: Math.floor((Date.now() - startTime) / 1000),
      extractedMetrics: {
        carbonEmissions: {
          scope1: 12000,
          scope2: 8500,
          scope3: null,
          unit: 'tCO2e',
          baselineYear: 2022,
        },
        renewableEnergy: {
          percentage: 85,
          totalMWh: 125000,
        },
        waterUsage: {
          totalLiters: 5000000,
          recycledPercentage: 30,
        },
        wasteRecycling: {
          rate: 75,
        },
        diversity: {
          womenInLeadership: 35,
          boardDiversity: 40,
        },
        safety: {
          incidents: 2,
          lostTimeRate: 0.5,
        },
        community: {
          investment: 250000,
          volunteerHours: 5000,
        },
        claimedImprovements: [
          { metric: 'Carbon Reduction', claimed: '40%', baseline: '2022' },
          { metric: 'Renewable Energy', claimed: '85%', baseline: '2020' },
        ],
      },
      thirdPartyVerification: {
        cdp: {
          verified: true,
          confidence: 'high',
          data: { carbonReduction: 5 },
          deviation: carbonDeviation,
          lastUpdated: new Date('2025-12-15'),
        },
        gri: {
          verified: true,
          confidence: 'medium',
          data: { renewableEnergy: 82 },
          missingDataPoints: ['Scope 3 emissions', 'Water baseline'],
        },
        regulatory: {
          euTaxonomy: false,
          companiesHouse: true,
          governanceVerified: true,
        },
        certifications: verificationData.certifications.map(c => ({
          type: c.type,
          valid: c.valid,
          expired: c.expired,
          expirationDate: new Date('2023-12-31'),
          scope: 'Environmental Management',
        })),
        industryBenchmark: {
          sectorAverage: verificationData.peerAverage,
          peerComparison: Object.keys(verificationData.peerAverage).reduce((acc, key) => {
            acc[key] = {
              borrower: verificationData.claimedMetrics[key] as number,
              average: verificationData.peerAverage[key],
              stdDev: verificationData.peerStdDev[key],
              outlier: Math.abs((verificationData.claimedMetrics[key] as number) - verificationData.peerAverage[key]) > 2 * verificationData.peerStdDev[key],
            };
            return acc;
          }, {} as Record<string, unknown>),
        },
      },
      riskScore: {
        overall: riskCalculation.overallScore,
        level: riskCalculation.riskLevel,
        components: riskCalculation.componentScores,
        breakdown: riskCalculation.breakdown,
      },
      alerts,
      comparison,
      lmaCompliance: {
        greenLoanPrinciples: false,
        sustainabilityCoordinator: false,
        reportingAligned: false,
        overallCompliant: false,
        score: 50,
      },
      euTaxonomyCompliance: {
        compliant: false,
        score: 45,
        issues: ['Missing Scope 3 emissions', 'Expired certifications'],
      },
    };

    setVerificationResult(result);
    setProcessingStep('complete');
    setProcessingTime(Math.floor((Date.now() - startTime) / 1000));
    addAuditLog('Verification completed', { 
      riskScore: riskCalculation.overallScore, 
      riskLevel: riskCalculation.riskLevel,
      alertsCount: alerts.length 
    });
  };

  const handleReset = () => {
    setSelectedLoan('');
    setNewLoanName('');
    setShowCreateLoan(false);
    setSelectedFile(null);
    setProcessingStep('idle');
    setProcessingTime(0);
    setVerificationResult(null);
    setError(null);
    setExtractedMetrics(null);
    setLmaCompliance([]);
    addAuditLog('Verification reset');
  };

  const processingSteps = [
    { key: 'uploading', label: 'Upload', icon: Upload },
    { key: 'processing', label: 'Process', icon: FileText },
    { key: 'validating', label: 'Validate', icon: FileCheck },
    { key: 'verifying', label: 'Verify', icon: Search },
    { key: 'detecting', label: 'Detect', icon: Shield },
    { key: 'mapping', label: 'Map', icon: Database },
    { key: 'scoring', label: 'Score', icon: TrendingUp },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">ESG Veritas Platform</h1>
        <p className="text-slate-600 mt-2">
          AI-powered ESG verification and greenwashing detection aligned with LMA Green Loan Terms
        </p>
      </div>

      {/* Step 1: Loan Selection & Document Upload */}
      {processingStep === 'idle' && !verificationResult && (
    <div className="space-y-6">
          {/* Loan Selection */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-slate-700">
                Select Loan or Create New
              </label>
              <button
                onClick={() => setShowCreateLoan(!showCreateLoan)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
              >
                <Plus size={16} />
                {showCreateLoan ? 'Cancel' : 'Create New Loan'}
              </button>
            </div>

            {showCreateLoan ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter loan name (e.g., Green Energy Project 2025)"
                  value={newLoanName}
                  onChange={(e) => setNewLoanName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleCreateLoan}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Loan
                </button>
              </div>
            ) : (
              <select
                value={selectedLoan}
                onChange={(e) => setSelectedLoan(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a loan or create new...</option>
                {sampleLoans.map(loan => (
                  <option key={loan.id} value={loan.id}>
                    {loan.basicDetails.borrower} - {loan.basicDetails.currency} {loan.basicDetails.amount.toLocaleString()}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Upload ESG Report</h2>
            <p className="text-sm text-slate-600 mb-4">
              Supported formats: PDF, Excel (.xlsx, .xls). Max size: 50MB
            </p>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-lg font-medium text-slate-700 mb-2">
                {isDragActive ? 'Drop file here...' : 'Drag & drop ESG report (PDF/Excel)'}
              </p>
              <p className="text-sm text-slate-500">or click to browse (max 50MB)</p>
            </div>

            {selectedFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-600" size={24} />
                  <div>
                    <p className="font-medium text-green-800">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
              </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {selectedLoan && selectedFile && (
              <button
                onClick={startVerification}
                className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Shield size={20} />
                Start ESG Verification
              </button>
            )}
          </div>
        </div>
      )}

      {/* Processing States */}
      {processingStep !== 'idle' && processingStep !== 'complete' && (
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {processingStep === 'uploading' && 'Step 1: Uploading Document...'}
                {processingStep === 'processing' && 'Step 2: Processing Document with AI...'}
                {processingStep === 'validating' && 'Step 3: Validating ESG Data...'}
                {processingStep === 'verifying' && 'Step 4: Verifying with Third-Party Sources...'}
                {processingStep === 'detecting' && 'Step 5: Detecting Greenwashing Risks...'}
                {processingStep === 'mapping' && 'Step 6: Mapping LMA Compliance...'}
                {processingStep === 'scoring' && 'Step 7: Calculating Risk Score...'}
              </h2>
              <p className="text-slate-600">
                {processingStep === 'uploading' && 'Validating file format and uploading to secure storage'}
                {processingStep === 'processing' && `Extracting 47 ESG metrics from document... (${processingTime}s elapsed)`}
                {processingStep === 'validating' && 'Checking data completeness, consistency, and trends...'}
                {processingStep === 'verifying' && 'Querying CDP, GRI, regulatory databases, and ISO registries...'}
                {processingStep === 'detecting' && 'Analyzing claims for suspicious patterns and inconsistencies...'}
                {processingStep === 'mapping' && 'Evaluating compliance with LMA Green Loan Principles...'}
                {processingStep === 'scoring' && 'Running greenwashing risk algorithm...'}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {processingSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const currentStepIndex = processingSteps.findIndex(s => s.key === processingStep);
                const isActive = currentStepIndex >= idx;
                const isCurrent = processingStep === step.key;
                
                return (
                  <div key={step.key} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCurrent ? 'bg-blue-600 text-white scale-110' :
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isActive && !isCurrent ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                    </div>
                    {idx < processingSteps.length - 1 && (
                      <div className={`w-12 h-1 ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {verificationResult && processingStep === 'complete' && (
        <div className="space-y-6">
          {/* Alert Banner */}
          {verificationResult.riskScore.level === 'high' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-500 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={32} />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-800 mb-2">GREENWASHING RISK DETECTED</h2>
                  <p className="text-red-700 mb-4">
                    Major data discrepancies found. Risk Score: <span className="font-bold">{verificationResult.riskScore.overall}/100 (HIGH RISK)</span>
                  </p>
                  {verificationResult.alerts.find(a => a.severity === 'critical') && (
                    <p className="text-red-800 font-semibold mb-4">
                      Estimated Liability: {verificationResult.alerts.find(a => a.severity === 'critical')?.currency} {verificationResult.alerts.find(a => a.severity === 'critical')?.estimatedLiability?.toLocaleString()}
                    </p>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                      Alert Team
                    </button>
                    <button onClick={handleExportPDF} className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {verificationResult.riskScore.level === 'low' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border-2 border-green-500 rounded-lg p-6"
            >
              <div className="flex items-center gap-4">
                <CheckCircle className="text-green-600" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-green-800">ESG Claims Verified</h2>
                  <p className="text-green-700">
                    Risk Score: <span className="font-bold">{verificationResult.riskScore.overall}/100 (LOW RISK)</span>
                  </p>
                </div>
                <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Download Certificate
                </button>
              </div>
            </motion.div>
          )}

          {/* Extracted Metrics Dashboard */}
          {extractedMetrics && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Database size={20} />
                Extracted ESG Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(extractedMetrics).slice(0, 8).map(([key, value]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {typeof value === 'object' ? JSON.stringify(value).slice(0, 20) + '...' : String(value)}
                    </p>
                  </div>
                ))}
              </div>
        </div>
      )}

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Score Gauge */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Risk Score</h3>
              <div className="flex justify-center">
                <RiskGauge
                  score={verificationResult.riskScore.overall}
                  label={`${verificationResult.riskScore.level.toUpperCase()} RISK`}
                  size="lg"
                />
              </div>
            </div>

            {/* Component Scores */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Score Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                {verificationResult.riskScore.breakdown.map((component) => (
                  <div key={component.component} className="space-y-2">
          <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{component.component}</span>
                      <span className="text-sm font-semibold text-slate-800">{component.score.toFixed(0)}/100</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          component.score < 30 ? 'bg-green-500' :
                          component.score < 60 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${component.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">Weight: {(component.weight * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LMA Compliance Mapping */}
          {lmaCompliance.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileCheck size={20} />
                LMA Green Loan Principles Compliance
              </h3>
              <div className="space-y-3">
                {lmaCompliance.map((criteria) => (
                  <div
                    key={criteria.id}
                    className={`p-4 rounded-lg border-2 ${
                      criteria.status === 'pass' ? 'bg-green-50 border-green-200' :
                      criteria.status === 'partial' ? 'bg-amber-50 border-amber-200' :
                      'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-slate-800">{criteria.principle}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            criteria.status === 'pass' ? 'bg-green-100 text-green-700' :
                            criteria.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {criteria.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-500">({criteria.category})</span>
                        </div>
                        {criteria.evidence && (
                          <p className="text-sm text-slate-600 mb-1">Evidence: {criteria.evidence}</p>
                        )}
                        {criteria.notes && (
                          <p className="text-sm text-slate-500 italic">{criteria.notes}</p>
                        )}
                      </div>
                      {criteria.status === 'pass' ? (
                        <CheckCircle className="text-green-600 flex-shrink-0 ml-4" size={24} />
                      ) : (
                        <XCircle className={`flex-shrink-0 ml-4 ${criteria.status === 'partial' ? 'text-amber-600' : 'text-red-600'}`} size={24} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>Summary:</strong> {lmaCompliance.filter(c => c.status === 'pass').length} Pass, {' '}
                  {lmaCompliance.filter(c => c.status === 'partial').length} Partial, {' '}
                  {lmaCompliance.filter(c => c.status === 'fail').length} Fail
                </p>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Claimed vs. Verified Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Metric</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Claimed</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Verified</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Deviation</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationResult.comparison.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-800 font-medium">{item.metric}</td>
                      <td className="py-3 px-4 text-slate-600">{item.claimed}</td>
                      <td className="py-3 px-4 text-slate-600">{item.verified}</td>
                      <td className="py-3 px-4 text-slate-600">{item.deviation.toFixed(1)}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'match' ? 'bg-green-100 text-green-700' :
                          item.status === 'minor' ? 'bg-amber-100 text-amber-700' :
                          item.status === 'major' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Sources */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Verification Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-medium text-slate-700">CDP</span>
                </div>
                <p className="text-sm text-slate-600">
                  {verificationResult.thirdPartyVerification.cdp.confidence.charAt(0).toUpperCase() + verificationResult.thirdPartyVerification.cdp.confidence.slice(1)} confidence
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Updated: {verificationResult.thirdPartyVerification.cdp.lastUpdated?.toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-amber-500" size={20} />
                  <span className="font-medium text-slate-700">GRI</span>
                </div>
                <p className="text-sm text-slate-600">
                  {verificationResult.thirdPartyVerification.gri.confidence.charAt(0).toUpperCase() + verificationResult.thirdPartyVerification.gri.confidence.slice(1)} confidence
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {verificationResult.thirdPartyVerification.gri.missingDataPoints.length} missing data points
                </p>
              </div>
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="text-red-500" size={20} />
                  <span className="font-medium text-slate-700">ISO Registry</span>
                </div>
                <p className="text-sm text-red-700">
                  Expired certification flagged
                </p>
                <p className="text-xs text-red-600 mt-1">
                  ISO 14001 expired
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-medium text-slate-700">Companies House</span>
                </div>
                <p className="text-sm text-slate-600">Verified</p>
              </div>
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Priority Actions</h3>
            <div className="space-y-3">
              {verificationResult.alerts
                .sort((a, b) => a.priority - b.priority)
                .slice(0, 5)
                .map((alert) => (
                  <div key={alert.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                            alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-slate-500">Priority {alert.priority} • {alert.timeline}</span>
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1">{alert.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                        <p className="text-sm font-medium text-slate-700">Recommended: {alert.recommendedAction}</p>
                        {alert.estimatedLiability && (
                          <p className="text-sm text-red-700 mt-1">
                            Estimated Liability: {alert.currency} {alert.estimatedLiability.toLocaleString()}
                          </p>
                        )}
                        <p className="text-xs text-slate-500 mt-2">Notify: {alert.notify.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">LMA Green Loan</p>
                  <p className="text-sm text-red-700">NON-COMPLIANT (2 of 4 requirements met)</p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">EU Taxonomy</p>
                  <p className="text-sm text-red-700">NON-COMPLIANT</p>
                  <p className="text-xs text-red-600 mt-1">
                    Issues: {verificationResult.euTaxonomyCompliance.issues.join(', ')}
                  </p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          {auditLog.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={20} />
                Audit Trail
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {auditLog.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <Hash size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User size={14} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{entry.user}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">
                          {entry.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{entry.action}</p>
                      {entry.details && (
                        <p className="text-xs text-slate-600 mt-1">
                          {JSON.stringify(entry.details).slice(0, 100)}...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
            >
              New Verification
            </button>
            <button
              onClick={handleExportJSON}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FileJson size={20} />
              Export JSON
            </button>
            <button
              onClick={handleExportPDF}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FileDown size={20} />
              Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
