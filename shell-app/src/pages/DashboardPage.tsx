import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MFELoader from '../components/MFELoader';

const DashboardApp = lazy(() => import('mfeDashboard/App'));

const DashboardPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<MFELoader />}>
        <DashboardApp />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DashboardPage;
