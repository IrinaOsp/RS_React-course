import Head from 'next/head';
import Pagination from './Pagination/Pagination';
import { SearchForm } from './SearchForm/SearchForm';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Pokemon search</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <SearchForm />
        <Pagination />
        <div>{children}</div>
      </main>
    </>
  );
}
