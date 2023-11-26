import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ThrowErrorButton from './ThrowErrorButton';

const MockHome = () => {
  return (
    <ErrorBoundary>
      <ThrowErrorButton />
    </ErrorBoundary>
  );
};

describe('ErrorBoundary', () => {
  it('renders error message on error', () => {
    render(<MockHome />);
    const button = screen.getByText('Throw Error');
    fireEvent.click(button);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
