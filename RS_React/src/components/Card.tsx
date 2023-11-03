import { ISearchResponseItem } from './SearchForm';

export default function Card(data: ISearchResponseItem) {
  const { name, id, height, weight, sprites } = data;

  return (
    <div className="search-item">
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
