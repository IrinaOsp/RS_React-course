import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useGetPokemonListQuery } from '../../api/itemsAPI';
import { ISearchArrayItem } from '../../types/types';
import { RootState } from '../../state/store';
import './SearchResults.css';

export default function SearchResults() {
  const search = useSelector((state: RootState) => state.search.searchText);
  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);
  const offset = currentPageNumber && itemsPerPage ? (+currentPageNumber - 1) * +itemsPerPage : '0';

  const { data, isLoading, isError, isSuccess } = useGetPokemonListQuery({
    search,
    itemsPerPage,
    offset,
  });

  const queryResponse: ISearchArrayItem[] = data && 'results' in data ? data.results : [data];

  return (
    <div className="main-section">
      <div className="search-results">
        {isLoading && <LoadingSpinner />}

        {isSuccess && queryResponse.map((item) => <Card key={item.name} {...item} />)}

        {isError && <p>No search results</p>}
      </div>
    </div>
  );
}
