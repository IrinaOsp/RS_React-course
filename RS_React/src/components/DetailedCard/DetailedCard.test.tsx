import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../mocks/server';

const MockDetailedCard = () => {
  return (
    <BrowserRouter>
      <DetailedCard />
    </BrowserRouter>
  );
};

const MockDetailedCardWrapper = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`/:id`} element={<DetailedCard />} />
    </Routes>
  </BrowserRouter>
);
describe('DetailedCard', () => {
  it('displays loading spinner when data is loading', () => {
    act(() => {
      window.history.pushState({}, 'DetailedPage#9', '/9');
      window.dispatchEvent(new Event('popstate'));
      render(<MockDetailedCard />);
    });
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).not.toBeNull();
  });

  it('displays data when loading is complete', async () => {
    await act(async () => {
      render(<MockDetailedCardWrapper />);
    });
    const baseExperience = await screen.findByText('Base experience: 64');
    const heldItems = await screen.findByText('Held items: no');
    expect(baseExperience).toBeInTheDocument();
    expect(heldItems).toBeInTheDocument();
  });

  it('closes the card when the close button is clicked', async () => {
    await act(async () => {
      render(<MockDetailedCardWrapper />);
    });
    const closeButton = await screen.findByText('X');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
    });
  });
});
