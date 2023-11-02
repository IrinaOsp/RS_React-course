import { ChangeEvent, useState } from 'react';
import ThrowErrorButton from './ThrowErrorButton';
import './styles/SearchForm.css';

interface ISearchFormProps {
  updateSearchData: (data: TypeSearchResponse) => void;
}

export type TypeSearchResponse = ISearchResponseItem | ISearchResponseArray | null;

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSearch = (): void => {
    if (localStorage.getItem('search') !== search) localStorage.setItem('search', search);

    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((res) => {
        if (!res.ok) throw new Error(`fetch error with status ${res.status}`);
        return res.json();
      })
      .then((data: TypeSearchResponse) => {
        props.updateSearchData(data);
      })
      .catch((error) => {
        console.error('Error ', error);
        props.updateSearchData(null);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
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
