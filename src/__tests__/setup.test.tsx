import { render, screen } from '@testing-library/react';

// Sample test to verify testing infrastructure
describe('Testing Infrastructure', () => {
  it('should render test properly', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should pass basic assertions', () => {
    expect(true).toBe(true);
    expect('test').toBeTruthy();
    expect([1, 2, 3]).toHaveLength(3);
  });
});
