import { ChangeEvent, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import ThrowErrorButton from '../ThrowErrorButton';
import './SearchForm.css';

interface ISearchFormProps {
  updateSearchData: (data: TypeSearchResponse) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export type TypeSearchResponse = ISearchResponseItem | ISearchResponseArray | null | '';

export interface ISearchResponseItem {
  height: number;
  id: number;
  name: string;
  sprites: { front_default: string };
  weight: number;
}

interface ISearchResponseArray {
  results: TypeSearchResponseArray;
}

export type TypeSearchResponseArray = ISearchArrayItem[];

interface ISearchArrayItem {
  name: string;
  url: string;
}

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
