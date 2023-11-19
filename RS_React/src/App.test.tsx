import { describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';

const MockApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App', () => {
  it('renders the Main component', () => {
    render(<MockApp />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('not renders the Page404 component for main route', () => {
    render(<MockApp />);
    expect(screen.queryByText('Page404')).toBeNull();
  });

  it('renders the Page404 component for unknown routes', async () => {
    act(() => {
      window.history.pushState({}, 'Test Page', './unknown/unknown');
      window.dispatchEvent(new Event('popstate'));
      render(<MockApp />);
    });
    expect(await screen.findByText('Page404')).toBeInTheDocument();
  });
});
