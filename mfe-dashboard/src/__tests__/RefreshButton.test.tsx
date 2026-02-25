import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RefreshButton from '../components/RefreshButton';

describe('RefreshButton', () => {
  it('shows "Refresh" when not refreshing', () => {
    render(<RefreshButton onRefresh={() => {}} isRefreshing={false} />);
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  it('shows "Refreshing..." when refreshing', () => {
    render(<RefreshButton onRefresh={() => {}} isRefreshing={true} />);
    expect(screen.getByText('Refreshing...')).toBeInTheDocument();
  });

  it('is disabled when refreshing', () => {
    render(<RefreshButton onRefresh={() => {}} isRefreshing={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('calls onRefresh when clicked', () => {
    const onRefresh = vi.fn();
    render(<RefreshButton onRefresh={onRefresh} isRefreshing={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onRefresh).toHaveBeenCalledOnce();
  });
});
