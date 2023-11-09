import { useContext, useEffect, useState } from 'react';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ISearchResponseItem } from '../../types/types';
import { SearchContext } from '../../context/Context';
import './SearchResults.css';

export default function SearchResults() {
  // const { data } = props;
  const { queryResponse } = useContext(SearchContext);
  const [renderData, setRenderData] = useState<ISearchResponseItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (queryResponse && 'results' in queryResponse) {
      Promise.all(
        queryResponse.results.map(async (item) => {
          try {
            const response = await fetch(item.url);
            return response.ok ? response.json() : null;
          } catch (error) {
            console.error('fetch error: ', error);
            return null;
          }
        })
      )
        .then((res) => setRenderData(res))
        .then(() => setIsLoading(false));
    }
    if (queryResponse && 'id' in queryResponse) {
      setRenderData([queryResponse]);
      setIsLoading(false);
    }

    if (queryResponse === null) setIsLoading(false);
  }, [queryResponse]);

  return (
    <div className="main-section">
      <div className="search-results">
        {isLoading && <LoadingSpinner />}

        {!isLoading &&
          queryResponse &&
          renderData &&
          renderData.map((item) => <Card {...item} key={item.name} />)}

        {!isLoading && !queryResponse && <p>No search results</p>}
      </div>
    </div>
  );
}
