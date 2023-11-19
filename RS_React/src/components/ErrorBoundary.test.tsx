import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import App from '../App';

const MockApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
describe('ErrorBoundary', () => {
  it('renders error message on error', () => {
    render(<MockApp />);
    const throwErrorButton = screen.getByText('Throw Error');
    fireEvent.click(throwErrorButton);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
