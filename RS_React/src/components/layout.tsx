import Head from 'next/head';
import Pagination from './Pagination/Pagination';
import { SearchForm } from './SearchForm/SearchForm';
import SearchResults from './SearchResults/SearchResults';
import { ISearchArrayItem, ISearchResponseArray } from '../types/types';

export function RootLayout({
  searchResults,
}: {
  searchResults: ISearchArrayItem | ISearchResponseArray;
}) {
  return (
    <>
      <Head>
        <title>Pokemon search</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        <SearchForm />
        <Pagination />
        <SearchResults data={searchResults} />
      </main>
    </>
  );
}
