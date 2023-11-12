import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import { BrowserRouter } from 'react-router-dom';
import { SearchState } from '../../context/Context';

const MockSearchForm = () => {
  return (
    <BrowserRouter>
      <SearchState>
        <SearchForm />
      </SearchState>
    </BrowserRouter>
  );
};

describe('SearchForm', async () => {
  it('checks if the entered value is saved to the local storage', () => {
    render(<MockSearchForm />);
    const inputElement = screen.getByPlaceholderText(/enter text/i);
    fireEvent.click(inputElement);
    const searchFormElement = screen.getByTitle('search-form');
    fireEvent.submit(searchFormElement);
    const searchText = 'ditto';
    fireEvent.change(inputElement, { target: { value: searchText } });

    const ls = localStorage.getItem('search') || '';
    expect(inputElement).toHaveTextContent(ls);
  });

  it('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('search', 'testSearchForm');
    const ls = localStorage.getItem('search') || '';
    render(<MockSearchForm />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input.value).toEqual(ls);
  });
});
