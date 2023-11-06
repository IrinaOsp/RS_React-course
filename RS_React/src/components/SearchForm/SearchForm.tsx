import { ChangeEvent, useState } from 'react';
import ThrowErrorButton from '../ThrowErrorButton';
import { ISearchFormProps } from '../../types/types';
import './SearchForm.css';

export function SearchForm(props: ISearchFormProps) {
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const searchParams = props.searchParams;
  const setSearchParams = props.setSearchParams;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSearch = (): void => {
    if (localStorage.getItem('search') !== search) localStorage.setItem('search', search);
    setSearchParams({ ...searchParams, search: search || '' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <ThrowErrorButton />
    </form>
  );
}
