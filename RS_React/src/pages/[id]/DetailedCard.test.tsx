import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import DetailedCard from './index';
import '../../mocks/server';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { mockCardList, mockDetailedCard } from '../../mocks/handlers';

const MockDetailedCard = () => {
  return (
    <Provider store={store}>
      <DetailedCard searchResults={mockCardList} detailedData={mockDetailedCard} />
    </Provider>
  );
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/9',
    query: {},
    push: vi.fn().mockImplementation(async () => ({ success: true })),
  }),
  useDispatch: () => vi.fn(),
}));

describe('DetailedCard', () => {
  it('displays data when loading is complete', async () => {
    await act(async () => {
      render(<MockDetailedCard />);
    });
    const baseExperience = await screen.findByText('Base experience: 64');
    const height = await screen.findByText('Height: 7');
    expect(baseExperience).toBeInTheDocument();
    expect(height).toBeInTheDocument();
  });
});
