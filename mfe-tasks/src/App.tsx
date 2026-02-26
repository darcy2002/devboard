import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 1,
    },
  },
});

const TasksApp = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="h-full flex flex-col min-h-0 w-full max-w-full bg-white">
      <div className="flex-shrink-0 w-full px-6 sm:px-8 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Tasks</h1>
            <p className="text-sm text-gray-400 mt-1">
              Keep track of your tasks. Drag cards between columns to update status.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.97] transition-all duration-200 w-full sm:w-auto shrink-0 shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col w-full px-6 sm:px-8 pb-4">
        <KanbanBoard />
      </div>

      <TaskForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TasksApp />
  </QueryClientProvider>
);

export default App;
