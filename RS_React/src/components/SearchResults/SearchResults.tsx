import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISearchResponseItem, TypeSearchResponse } from '../SearchForm/SearchForm';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './SearchResults.css';

interface ISearchResultsProps {
  data: TypeSearchResponse;
}

export default function SearchResults(props: ISearchResultsProps) {
  const { data } = props;
  const [renderData, setRenderData] = useState<ISearchResponseItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

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
