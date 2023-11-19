import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThrowErrorButton from '../ThrowErrorButton';
import { RootState } from '../../state/store';
import { updateSearchText } from '../../state/search/searchSlice';
import './SearchForm.css';

export function SearchForm() {
  const [inputText, setInputText] = useState(localStorage.getItem('search') || '');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search.searchText);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const searchFromParams = searchParams.get('search');

  useEffect(() => {
    if (searchFromParams) {
      setInputText(searchFromParams);
      dispatch(updateSearchText(searchText));
    }
  }, [searchFromParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateSearchText(inputText));

    if (inputText && localStorage.getItem('search') !== inputText)
      localStorage.setItem('search', inputText);
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
