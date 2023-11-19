import { ReactNode } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import Pagination from '../Pagination/Pagination';

export default function Wrapper(): ReactNode {
  return (
    <div className="wrapper">
      <SearchForm />
      <Pagination />
      <SearchResults />
    </div>
  );
}
