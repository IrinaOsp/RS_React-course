import { Link, useSearchParams } from 'react-router-dom';
import { ISearchResponseItem } from '../../types/types';

export default function Card(data: ISearchResponseItem) {
  const { name, id, height, weight, sprites } = data;
  const [searchParams] = useSearchParams();
  return (
    <Link to={`/${id}?${searchParams}`} style={{ color: 'inherit' }}>
      <div className="search-item">
        <span>Name: {name}</span>
        <span>ID: {id}</span>
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
        <div>
          <img src={sprites.front_default} alt="img" />
        </div>
      </div>
    </Link>
  );
}
