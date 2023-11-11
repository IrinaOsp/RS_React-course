import { describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the Main component', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('not renders the Page404 component for main route', () => {
    render(<App />);
    expect(screen.queryByText('Page404')).toBeNull();
  });

  it('renders the Page404 component for unknown routes', async () => {
    act(() => {
      window.history.pushState({}, 'Test Page', '/unknown');
      window.dispatchEvent(new Event('popstate'));
      render(<App />);
    });
    expect(await screen.findByText('Page404')).toBeInTheDocument();
  });
});
