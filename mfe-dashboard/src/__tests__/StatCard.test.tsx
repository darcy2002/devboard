import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../components/StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(
      <StatCard
        icon={<span>icon</span>}
        title="Total Tasks"
        value={42}
        colorClass="bg-blue-100"
      />
    );
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <StatCard
        icon={<span>icon</span>}
        title="Completed"
        value={10}
        subtitle="50% done"
        colorClass="bg-green-100"
      />
    );
    expect(screen.getByText('50% done')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(
      <StatCard
        icon={<span>icon</span>}
        title="Pending"
        value={5}
        colorClass="bg-yellow-100"
      />
    );
    const subtitles = container.querySelectorAll('.text-xs.text-gray-400');
    expect(subtitles.length).toBe(0);
  });
});
