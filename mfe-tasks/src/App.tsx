import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskFilter as TaskFilterType } from './types';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
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
  const [filter, setFilter] = useState<TaskFilterType>('all');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your tasks</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      <div className="mb-6">
        <TaskFilter activeFilter={filter} onFilterChange={setFilter} />
      </div>

      <TaskList filter={filter} />
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
