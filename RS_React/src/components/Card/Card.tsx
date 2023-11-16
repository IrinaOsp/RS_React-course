import { Link, useSearchParams } from 'react-router-dom';
import { baseURL } from '../../data/data';
import { ISearchArrayItem } from '../../types/types';

export default function Card(data: ISearchArrayItem) {
  // const { name, id, height, weight, sprites } = data;
  const { name, url } = data;
  // id from url https://pokeapi.co/api/v2/pokemon/1/
  const id = url.substring(baseURL.length).slice(0, -1);

  const [searchParams] = useSearchParams();
  return (
    <Link to={`/${id}?${searchParams}`} style={{ color: 'inherit' }}>
      <div className="search-item">
        <span>Name: {name}</span>
        {/* <span>ID: {id}</span>
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
        <div>
          <img src={sprites.front_default} alt="img" />
        </div> */}
      </div>
    </Link>
  );
}
