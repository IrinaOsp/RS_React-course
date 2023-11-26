import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';

describe('SearchForm', async () => {
  it('search form takes input event value', async () => {
    vi.mock('next/router', () => ({
      useRouter: () => ({
        pathname: '/',
        query: {},
        push: vi.fn().mockImplementation(async () => ({ success: true })),
      }),
      useDispatch: () => vi.fn(),
    }));

    render(<SearchForm />);
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    const button = screen.getByText('Search');
    const searchText = 'ditto';

    fireEvent.change(input, { target: { value: searchText } });
    fireEvent.click(button);
    expect(input.value).toBe(searchText);
  });
});
