import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the Main component', () => {
    // ARRANGE
    render(<App />);
    // ACT
    // EXPECT
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the Page404 component', () => {
    // ARRANGE
    render(<App />);
    // ACT
    // EXPECT
    expect(screen.queryByText('Page404')).toBeNull();
  });
});
