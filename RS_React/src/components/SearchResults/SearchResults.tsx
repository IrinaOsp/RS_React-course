// import { useContext, useEffect, useState } from 'react';
import Card from '../Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
// import { SearchContext } from '../../context/Context';
import './SearchResults.css';
import { useGetPokemonListQuery } from '../../api/itemsAPI';
import { ISearchArrayItem } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export default function SearchResults() {
  // const { dataToRenderCard, updateDataToRenderCard } = useContext(SearchContext);
  // const [isLoading, setIsLoading] = useState(false);
  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);
  const offset = currentPageNumber && itemsPerPage ? (+currentPageNumber - 1) * +itemsPerPage : '0';

  const { data, isLoading, isError, isSuccess } = useGetPokemonListQuery({ itemsPerPage, offset });
  const queryResponse: ISearchArrayItem[] = data ? data.results : [];
  // useEffect(() => {
  // setIsLoading(true);

  // if (queryResponse && 'results' in queryResponse) {
  // Promise.all(
  //   queryResponse.results.map(async (item) => {
  //     try {
  //       const response = await fetch(item.url);
  //       return response.ok ? response.json() : null;
  //     } catch (error) {
  //       return null;
  //     }
  //   })
  // ).then((res) => updateDataToRenderCard(res));
  // .then(() => setIsLoading(false));
  // }
  // if (queryResponse && 'id' in queryResponse) {
  //   updateDataToRenderCard([queryResponse]);
  // setIsLoading(false);
  // }

  // if (queryResponse === null)
  // setIsLoading(false);
  // }, [queryResponse]);

  return (
    <div className="main-section">
      <div className="search-results">
        {isLoading && <LoadingSpinner />}

        {isSuccess &&
          // dataToRenderCard &&
          // dataToRenderCard.map((item) => <Card key={item.id} {...item} />)}
          queryResponse.map((item) => <Card key={item.name} {...item} />)}

        {isError && (
          // 'results' in queryResponse &&
          // queryResponse.results.length === 0 &&
          <p>No search results</p>
        )}
      </div>
    </div>
  );
}
