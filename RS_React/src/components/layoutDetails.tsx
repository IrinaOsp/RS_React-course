import Head from 'next/head';
import Pagination from './Pagination/Pagination';
import { SearchForm } from './SearchForm/SearchForm';
import SearchResults from './SearchResults/SearchResults';
import { ISearchArrayItem, ISearchResponseArray } from '../types/types';

type RootLayoutProps = {
  children: React.ReactNode;
  searchResults: ISearchArrayItem | ISearchResponseArray;
};
export function RootLayoutDetails({ children, searchResults }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Pokemon search</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <SearchForm />
        <Pagination />
        <SearchResults data={searchResults} />
        <div>{children}</div>
      </main>
    </>
  );
}
