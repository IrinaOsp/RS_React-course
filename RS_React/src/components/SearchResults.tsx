import { useState } from 'react';
import { ISearchResponseItem, TypeSearchResponse } from './SearchForm';
import './styles/SearchResults.css';

interface ISearchResultsProps {
  data: TypeSearchResponse;
}

export default function SearchResults(props: ISearchResultsProps) {
  const [renderData, setRenderData] = useState<ISearchResponseItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (data: TypeSearchResponse) => {
    setIsLoading(true);

    if (data && 'results' in data) {
      const renderData: ISearchResponseItem[] = await Promise.all(
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
      setRenderData(renderData);
      setIsLoading(false);
    }

    if (data && 'id' in data) {
      setRenderData([data]);
      setIsLoading(false);
    }

    if (data === null) setIsLoading(false);
  };

  if (props.data) loadData(props.data);

  return (
    <div className="search-results">
      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        props.data &&
        renderData &&
        renderData.map((item) => (
          <div key={item.name} className="search-item">
            <span>Name: {item.name}</span>
            <span>ID: {item.id}</span>
            <span>Height: {item.height}</span>
            <span>Weight: {item.weight}</span>
            <div>
              <img src={item.sprites.front_default} alt="img" />
            </div>
          </div>
        ))}

      {!isLoading && !props.data && <p>No search results</p>}
    </div>
  );
}
