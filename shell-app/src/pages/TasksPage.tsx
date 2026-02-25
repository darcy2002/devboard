import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import MFELoader from '../components/MFELoader';

const TasksApp = lazy(() => import('mfeTasks/App'));

const TasksPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<MFELoader />}>
        <TasksApp />
      </Suspense>
    </ErrorBoundary>
  );
};

export default TasksPage;
