import { itemsAPI } from '../api/itemsAPI';
import { RootLayout } from '../components/layout';
import { wrapper } from '../state/store';
import { ISearchArrayItem, ISearchResponseArray } from '../types/types';

type Props = {
  searchResults: ISearchArrayItem | ISearchResponseArray;
};

export default function Home({ searchResults }: Props) {
  return <RootLayout searchResults={searchResults} />;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const currentPage = context.query.page || 1;
  const itemsPerPage =
    (typeof context.query.page_size === 'string' && context.query.page_size) || 8;
  const offset = currentPage && itemsPerPage ? (+currentPage - 1) * +itemsPerPage : '0';
  const searchQuery = (typeof context.query.search === 'string' && context.query.search) || '';
  store.dispatch(
    itemsAPI.endpoints.getPokemonList.initiate({
      search: searchQuery,
      itemsPerPage,
      offset,
    })
  );

  const arr = await Promise.all(store.dispatch(itemsAPI.util.getRunningQueriesThunk()));
  return {
    props: {
      searchResults: JSON.parse(JSON.stringify(arr[0].data)),
    },
  };
});
