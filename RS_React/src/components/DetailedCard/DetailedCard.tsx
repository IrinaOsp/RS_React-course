import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ISearchResponseItemDetailed } from '../../types/types';
import { useGetPokemonDetailsQuery } from '../../api/itemsAPI';
import './DetailedCard.css';
import { setIsLoading } from '../../state/loading/loadingSlice';

export default function DetailedCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useGetPokemonDetailsQuery(id || '0');
  const detailedData: ISearchResponseItemDetailed = data ? data : {};

  isLoading
    ? dispatch(setIsLoading({ key: 'isDetailedCardLoading', value: true }))
    : dispatch(setIsLoading({ key: 'isDetailedCardLoading', value: false }));

  const handleClose = () => {
    navigate(-1 || '/');
  };

  return (
    <div className="detailed-card" data-testid="detailed-card">
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <>
          <span>Name: {detailedData.name}</span>
          <span>ID: {detailedData.id}</span>
          <span>Height: {detailedData.height}</span>
          <span>Weight: {detailedData.weight}</span>
          <span>Base experience: {detailedData.base_experience}</span>
          <p>
            Abilities:
            {detailedData.abilities.length
              ? detailedData.abilities.map((el) => (
                  <span key={el.ability.name}> {el.ability.name}; </span>
                ))
              : ' no'}
          </p>
          <p>
            Held items:
            {detailedData['held_items'].length
              ? detailedData['held_items'].map((el) => (
                  <span key={el.item.name}> {el.item.name}; </span>
                ))
              : ' no'}
          </p>

          <div className="detailed-img">
            <img src={detailedData.sprites.other['official-artwork'].front_default} alt="img" />
          </div>
        </>
      )}
      {isError && <span>Error in fetch detailed card</span>}
      <span className="detailed-card-close" onClick={handleClose}>
        X
      </span>
      <div className="close-background" onClick={handleClose} />
    </div>
  );
}
