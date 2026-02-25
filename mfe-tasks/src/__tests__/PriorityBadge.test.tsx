import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PriorityBadge from '../components/PriorityBadge';

describe('PriorityBadge', () => {
  it('renders "Low" for low priority', () => {
    render(<PriorityBadge priority="low" />);
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('renders "Medium" for medium priority', () => {
    render(<PriorityBadge priority="medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders "High" for high priority', () => {
    render(<PriorityBadge priority="high" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies green classes for low priority', () => {
    render(<PriorityBadge priority="low" />);
    const badge = screen.getByText('Low');
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });

  it('applies yellow classes for medium priority', () => {
    render(<PriorityBadge priority="medium" />);
    const badge = screen.getByText('Medium');
    expect(badge.className).toContain('bg-yellow-100');
    expect(badge.className).toContain('text-yellow-800');
  });

  it('applies red classes for high priority', () => {
    render(<PriorityBadge priority="high" />);
    const badge = screen.getByText('High');
    expect(badge.className).toContain('bg-red-100');
    expect(badge.className).toContain('text-red-800');
  });
});
