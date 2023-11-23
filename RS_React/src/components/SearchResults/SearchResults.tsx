import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useGetPokemonListQuery } from '../../api/itemsAPI';
import { ISearchArrayItem } from '../../types/types';
import { RootState } from '../../state/store';
import styles from './SearchResults.module.css';
import { setIsLoading } from '../../state/loading/loadingSlice';

export default function SearchResults() {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.search.searchText);
  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);
  const offset = currentPageNumber && itemsPerPage ? (+currentPageNumber - 1) * +itemsPerPage : '0';

  const { data, isLoading, isError, isSuccess } = useGetPokemonListQuery({
    search,
    itemsPerPage,
    offset,
  });

  isLoading
    ? dispatch(setIsLoading({ key: 'isCardLoading', value: true }))
    : dispatch(setIsLoading({ key: 'isCardLoading', value: false }));

  const queryResponse: ISearchArrayItem[] = data && 'results' in data ? data.results : [data];

  return (
    <div className={styles.mainSection}>
      <div className={styles.searchResults}>
        {isLoading && <LoadingSpinner />}

        {(!data || isError) && <p>No search results</p>}

        {isSuccess && data && queryResponse.map((item) => <Card key={item.name} {...item} />)}
      </div>
    </div>
  );
}
