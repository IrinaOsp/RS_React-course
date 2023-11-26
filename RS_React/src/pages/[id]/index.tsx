import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ISearchResponseItemDetailed } from '../../types/types';
import { useGetPokemonDetailsQuery } from '../../api/itemsAPI';
import styles from './DetailedCard.module.css';
import { setIsLoading } from '../../state/loading/loadingSlice';
import { useRouter } from 'next/router';

export default function DetailedCard() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '0';
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useGetPokemonDetailsQuery(id);
  const detailedData: ISearchResponseItemDetailed = data ? data : {};

  isLoading
    ? dispatch(setIsLoading({ key: 'isDetailedCardLoading', value: true }))
    : dispatch(setIsLoading({ key: 'isDetailedCardLoading', value: false }));

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className={styles.detailedCard} data-testid="detailed-card">
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

          <div className={styles.detailedImg}>
            <img src={detailedData.sprites.other['official-artwork'].front_default} alt="img" />
          </div>
        </>
      )}
      {isError && <span>Error in fetch detailed card</span>}
      <span className={styles.detailedCardClose} onClick={handleClose}>
        X
      </span>
      <div className={styles.closeBackground} onClick={handleClose} />
    </div>
  );
}
