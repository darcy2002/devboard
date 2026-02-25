import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFilter from '../components/TaskFilter';

describe('TaskFilter', () => {
  it('renders all three filter buttons', () => {
    render(<TaskFilter activeFilter="all" onFilterChange={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('highlights the active filter', () => {
    render(<TaskFilter activeFilter="pending" onFilterChange={() => {}} />);
    const pendingBtn = screen.getByText('Pending');
    expect(pendingBtn.className).toContain('bg-indigo-600');
    expect(pendingBtn.className).toContain('text-white');
  });

  it('calls onFilterChange when a filter is clicked', () => {
    const onFilterChange = vi.fn();
    render(<TaskFilter activeFilter="all" onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText('Completed'));
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });
});
