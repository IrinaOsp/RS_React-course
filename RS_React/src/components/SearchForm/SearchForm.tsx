import { ChangeEvent, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import ThrowErrorButton from '../ThrowErrorButton';
import './SearchForm.css';
import { SearchContext } from '../../context/Context';

export function SearchForm() {
  // const [inputValue, setInputValue] = useState(localStorage.getItem('myValue') || '');
  const { searchText, updateSearchText } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updateSearchText(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputElement = (e.target as HTMLFormElement).elements.namedItem('search');
    const value = inputElement instanceof HTMLInputElement ? inputElement.value : '';

    if (localStorage.getItem('search') !== value) localStorage.setItem('search', value || '');
    updateSearchText(value);
    setSearchParams({ search: value });
  };

  return (
    <form className="search-form" title="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter text"
        value={searchText}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
      <ThrowErrorButton />
    </form>
  );
}
