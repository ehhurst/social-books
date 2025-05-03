import React from 'react';
import { render } from '@testing-library/react';
import Star from '../Star';

describe('Star component', () => {
  it('renders a filled star when filled is true', () => {
    const { container } = render(<Star filled={true} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('data-icon', 'star'); // Filled and empty stars share the same icon name, but the library swaps styles
  });

  it('renders an empty star when filled is false', () => {
    const { container } = render(<Star filled={false} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('data-prefix', 'far'); // Regular (empty) star uses 'far' prefix
  });

  it('renders a solid star when filled is true', () => {
    const { container } = render(<Star filled={true} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-prefix', 'fas'); // Solid (filled) star uses 'fas' prefix
  });
});
