import { useNavigate, useSearchParams } from 'react-router-dom';
import { ISearchResponseItem } from './SearchForm';

export default function Card(data: ISearchResponseItem) {
  const { name, id, height, weight, sprites } = data;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    navigate(`${id}/${searchParams}`);
  };

  return (
    <div className="search-item" onClick={handleClick}>
      <span>Name: {name}</span>
      <span>ID: {id}</span>
      <span>Height: {height}</span>
      <span>Weight: {weight}</span>
      <div>
        <img src={sprites.front_default} alt="img" />
      </div>
    </div>
  );
}
