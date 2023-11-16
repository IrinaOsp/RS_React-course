import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ThrowErrorButton from '../ThrowErrorButton';
import './SearchForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { updateSearchText } from '../../state/search/searchSlice';

export function SearchForm() {
  // const [inputValue, setInputValue] = useState(localStorage.getItem('myValue') || '');
  const [inputText, setInputText] = useState('');
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search.searchText);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    setInputText(searchText);
    setSearchParams({ search: searchText });
  }, [searchText]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateSearchText(inputText));
    // const inputElement = (e.target as HTMLFormElement).elements.namedItem('search');
    // const value = inputElement instanceof HTMLInputElement ? inputElement.value : '';

    // if (localStorage.getItem('search') !== value) localStorage.setItem('search', value || '');
    // updateSearchText(value);
    setSearchParams({ search: inputText });
  };

  return (
    <form className="search-form" title="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
      <ThrowErrorButton />
    </form>
  );
}
