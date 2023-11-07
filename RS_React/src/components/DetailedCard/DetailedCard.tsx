import { useEffect, useState } from 'react';
import { ErrorResponse, useNavigate, useParams } from 'react-router-dom';

import { baseURL } from '../../data/data';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './DetailedCard.css';
import { ISearchResponseItemDetailed } from '../../types/types';

export default function DetailedCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ISearchResponseItemDetailed | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}${id}`)
      .then((res) => (res.ok ? res.json() : Error(`error in fetch, status ${res.status}`)))
      .then((itemData) => setData(itemData))
      .then(() => setIsLoading(false))
      .catch((e: ErrorResponse) => {
        throw Error(`error in fetch detailed card: ${e}`);
      });
  }, [id]);

  const handleClose = () => {
    navigate(-1 || '/');
  };

  return (
    <div className="detailed-card">
      {isLoading && <LoadingSpinner />}
      {data && (
        <>
          <span>Name: {data.name}</span>
          <span>ID: {data.id}</span>
          <span>Height: {data.height}</span>
          <span>Weight: {data.weight}</span>
          <span>Base experience: {data.base_experience}</span>
          <p>
            Abilities:
            {data.abilities.length
              ? data.abilities.map((el) => <span key={el.ability.name}> {el.ability.name}; </span>)
              : ' no'}
          </p>
          <p>
            Held items:
            {data['held_items'].length
              ? data['held_items'].map((el) => <span key={el.item.name}> {el.item.name}; </span>)
              : ' no'}
          </p>

          <div className="detailed-img">
            <img src={data.sprites.other['official-artwork'].front_default} alt="img" />
          </div>
        </>
      )}
      <span className="detailed-card-close" onClick={handleClose}>
        X
      </span>
      <div className="close-background" onClick={handleClose} />
    </div>
  );
}
