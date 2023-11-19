import { Link, useSearchParams } from 'react-router-dom';
import { baseURL } from '../../data/data';
import { ISearchArrayItem, ISearchResponseItemDetailed } from '../../types/types';

export default function Card(data: ISearchArrayItem | ISearchResponseItemDetailed) {
  // id from url https://pokeapi.co/api/v2/pokemon/1/
  const id = 'url' in data ? data.url.substring(baseURL.length).slice(0, -1) : data.id;

  const [searchParams] = useSearchParams();
  return (
    <Link to={`/${id}?${searchParams}`} style={{ color: 'inherit' }}>
      <div className="search-item">
        <span>Name: {data.name}</span>
        <span>ID: {id || id}</span>
      </div>
    </Link>
  );
}
