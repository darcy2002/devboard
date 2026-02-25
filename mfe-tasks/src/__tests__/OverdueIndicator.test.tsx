import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OverdueIndicator from '../components/OverdueIndicator';

describe('OverdueIndicator', () => {
  it('shows "Overdue" for pending task with past due date', () => {
    render(<OverdueIndicator status="pending" dueDate="2024-01-01" />);
    expect(screen.getByText(/Overdue/)).toBeInTheDocument();
  });

  it('does not show for completed tasks', () => {
    render(<OverdueIndicator status="completed" dueDate="2024-01-01" />);
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });

  it('does not show for pending tasks with future due date', () => {
    const futureDate = new Date(Date.now() + 86400000 * 30).toISOString();
    render(<OverdueIndicator status="pending" dueDate={futureDate} />);
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });
});
