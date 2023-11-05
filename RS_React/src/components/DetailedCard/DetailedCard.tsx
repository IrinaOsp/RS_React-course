import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ISearchResponseItem } from '../SearchForm/SearchForm';
import { baseURL } from '../../data/data';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './DetailedCard.css';

export default function DetailedCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ISearchResponseItem | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}${id}`)
      .then((res) => res.json())
      .then((itemData) => setData(itemData))
      .then(() => setIsLoading(false));
  }, [id]);

  const handleClose = () => {
    navigate(-1);
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
          <div className="detailed-img">
            <img src={data.sprites.front_default} alt="img" />
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
