import { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import MetricCard from '@/components/ui/MetricCard';
import { type LoanDocument } from '@/types';

export function DocumentProcessing() {
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<LoanDocument | null>(null);
  const [processingTime, setProcessingTime] = useState(0);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setProcessing(true);
    setProcessingTime(0);

    // Simulate processing with timer
    const startTime = Date.now();
    const timer = setInterval(() => {
      setProcessingTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);

    // Simulate API call (replace with actual Claude API call)
    setTimeout(() => {
      clearInterval(timer);
      
      // Mock extracted data
      const mockData: LoanDocument = {
        id: `LOAN-${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date(),
        processingTime: 90,
        status: 'complete',
        basicDetails: {
          borrower: 'Green Energy Corp',
          amount: 250000000,
          currency: 'USD',
          interestRate: 'SOFR + 2.1%',
          maturityDate: '2031-12-15',
          facilityType: 'Term Loan'
        },
        covenants: {
          financial: [
            { type: 'Debt/EBITDA', limit: '< 3.0x', frequency: 'Quarterly' }
          ],
          reporting: [
            { type: 'Financial Statements', frequency: 'Quarterly', deadline: '45 days' }
          ]
        },
        esgObligations: {
          targets: ['30% carbon reduction by 2028'],
          reportingFrequency: 'Annual',
          verificationRequired: true
        },
        parties: {
          lenders: ['Bank A', 'Bank B'],
          agent: 'Global Bank Ltd'
        }
      };

      setExtractedData(mockData);
      setProcessing(false);
    }, 3000); // 3 seconds for demo
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Document Intelligence Engine</h1>
        <p className="text-slate-600 mt-2">
          Upload loan agreements for instant AI-powered extraction (99% faster than manual review)
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Processing Time"
          value="90 sec"
          subtitle="vs 3-5 days traditional"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Cost Savings"
          value="$8K-$15K"
          subtitle="per loan document"
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="Accuracy Rate"
          value="95%+"
          subtitle="extraction accuracy"
          icon={FileText}
          color="slate"
        />
      </div>

      {/* Upload Zone */}
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
          {isDragActive ? 'Drop PDF here...' : 'Drag & drop loan agreement PDF'}
        </p>
        <p className="text-sm text-slate-500">or click to browse (max 50MB)</p>
      </div>

      {/* Processing State */}
      {processing && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>
              <p className="font-medium text-blue-900">Processing document...</p>
              <p className="text-sm text-blue-700">Elapsed: {processingTime} seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Extracted Data */}
      {extractedData && !processing && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Extracted Data</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export JSON
              </button>
              <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
                Export CSV
              </button>
            </div>
          </div>

          {/* Basic Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Borrower</p>
                <p className="font-medium text-slate-800">{extractedData.basicDetails.borrower}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Loan Amount</p>
                <p className="font-medium text-slate-800">
                  {extractedData.basicDetails.currency} {extractedData.basicDetails.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Interest Rate</p>
                <p className="font-medium text-slate-800">{extractedData.basicDetails.interestRate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Maturity Date</p>
                <p className="font-medium text-slate-800">{extractedData.basicDetails.maturityDate}</p>
              </div>
            </div>
          </div>

          {/* Covenants */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Financial Covenants</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-sm font-medium text-slate-600">Type</th>
                  <th className="text-left py-2 text-sm font-medium text-slate-600">Limit</th>
                  <th className="text-left py-2 text-sm font-medium text-slate-600">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.covenants.financial.map((covenant, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="py-3 text-slate-800">{covenant.type}</td>
                    <td className="py-3 text-slate-800">{covenant.limit}</td>
                    <td className="py-3 text-slate-800">{covenant.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ESG Obligations */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">ESG Obligations</h3>
            <ul className="list-disc list-inside space-y-2">
              {extractedData.esgObligations.targets.map((target, idx) => (
                <li key={idx} className="text-slate-700">{target}</li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 flex gap-6">
              <div>
                <p className="text-sm text-slate-500">Reporting Frequency</p>
                <p className="font-medium text-slate-800">{extractedData.esgObligations.reportingFrequency}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Verification Required</p>
                <p className="font-medium text-slate-800">
                  {extractedData.esgObligations.verificationRequired ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
