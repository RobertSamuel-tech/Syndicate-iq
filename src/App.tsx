import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Spinner } from './components/ui/Progress';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const DocumentProcessing = lazy(() => import('./pages/DocumentProcessing').then((module) => ({ default: module.DocumentProcessing })));
const DueDiligence = lazy(() => import('./pages/DueDiligence').then((module) => ({ default: module.DueDiligence })));
const DueDiligenceWorkflow = lazy(() => import('./pages/DueDiligenceWorkflow').then((module) => ({ default: module.DueDiligenceWorkflowPage })));
const CovenantMonitoring = lazy(() => import('./pages/CovenantMonitoring').then((module) => ({ default: module.CovenantMonitoring })));
const ESGMonitoring = lazy(() => import('./pages/ESGMonitoring').then((module) => ({ default: module.ESGMonitoring })));
const ESGVeritas = lazy(() => import('./pages/ESGVeritas').then((module) => ({ default: module.ESGVeritas })));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <Spinner />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/document-processing" element={<DocumentProcessing />} />
      <Route path="/due-diligence" element={<DueDiligence />} />
      <Route path="/due-diligence-workflow" element={<DueDiligenceWorkflow />} />
      <Route path="/covenant-monitoring" element={<CovenantMonitoring />} />
      <Route path="/esg-monitoring" element={<ESGMonitoring />} />
      <Route path="/esg-veritas" element={<ESGVeritas />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AppRoutes />
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
