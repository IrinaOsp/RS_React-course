import { useContext, useEffect, useState } from 'react';
import Card from '../Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { SearchContext } from '../../context/Context';
import './SearchResults.css';

export default function SearchResults() {
  const { queryResponse, dataToRenderCard, updateDataToRenderCard } = useContext(SearchContext);
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
            return null;
          }
        })
      )
        .then((res) => updateDataToRenderCard(res))
        .then(() => setIsLoading(false));
    }
    if (queryResponse && 'id' in queryResponse) {
      updateDataToRenderCard([queryResponse]);
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
          dataToRenderCard &&
          dataToRenderCard.map((item) => <Card key={item.id} {...item} />)}

        {!isLoading &&
          queryResponse &&
          'results' in queryResponse &&
          queryResponse.results.length === 0 && <p>No search results</p>}
      </div>
    </div>
  );
}
