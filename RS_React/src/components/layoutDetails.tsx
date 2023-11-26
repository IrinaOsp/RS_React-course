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
      <main style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <SearchForm />
        <Pagination />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
          <SearchResults data={searchResults} />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
