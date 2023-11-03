import { useEffect, useState } from 'react';
import { ISearchResponseItem, TypeSearchResponse } from './SearchForm';
import './styles/SearchResults.css';
import { Outlet } from 'react-router-dom';
import Card from './Card';

interface ISearchResultsProps {
  data: TypeSearchResponse;
}

export default function SearchResults(props: ISearchResultsProps) {
  const { data } = props;
  const [renderData, setRenderData] = useState<ISearchResponseItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // const loadData = async (data: TypeSearchResponse) => {
    setIsLoading(true);

    if (data && 'results' in data) {
      const renderData: Promise<ISearchResponseItem[]> = Promise.all(
        data.results.map(async (item) => {
          try {
            const response = await fetch(item.url);
            return response.ok ? response.json() : null;
          } catch (error) {
            console.error('fetch error: ', error);
            return null;
          }
        })
      );
      renderData.then((res) => setRenderData(res));
      setIsLoading(false);
    }

    if (data && 'id' in data) {
      setRenderData([data]);
      setIsLoading(false);
    }

    if (data === null) setIsLoading(false);
    // };
  }, [data]);

  return (
    <div className="main-section">
      <div className="search-results">
        {isLoading && <p>Loading...</p>}

        {!isLoading &&
          props.data &&
          renderData &&
          renderData.map((item) => <Card {...item} key={item.name} />)}

        {!isLoading && !props.data && <p>No search results</p>}
      </div>

      <Outlet />
    </div>
  );
}
