import { useEffect, useState } from 'react';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ISearchResponseItem, ISearchResultsProps } from '../../types/types';
import './SearchResults.css';

export default function SearchResults(props: ISearchResultsProps) {
  const { data } = props;
  const [renderData, setRenderData] = useState<ISearchResponseItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (data && 'results' in data) {
      Promise.all(
        data.results.map(async (item) => {
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

    if (data && 'id' in data) {
      setRenderData([data]);
      setIsLoading(false);
    }

    if (data === null) setIsLoading(false);
  }, [data]);

  return (
    <div className="main-section">
      <div className="search-results">
        {isLoading && <LoadingSpinner />}

        {!isLoading &&
          props.data &&
          renderData &&
          renderData.map((item) => <Card {...item} key={item.name} />)}

        {!isLoading && !props.data && <p>No search results</p>}
      </div>
    </div>
  );
}
