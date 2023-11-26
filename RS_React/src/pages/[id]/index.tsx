// import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ISearchResponseItemDetailed } from '../../types/types';
import { itemsAPI } from '../../api/itemsAPI';
import styles from './DetailedCard.module.css';
import { useRouter } from 'next/router';
import { ISearchArrayItem, ISearchResponseArray } from '../../types/types';
import { wrapper } from '../../state/store';
import { RootLayoutDetails } from '../../components/layoutDetails';

type Props = {
  searchResults: ISearchArrayItem | ISearchResponseArray;
  detailedData: ISearchResponseItemDetailed;
};

export default function DetailedCard({ searchResults, detailedData }: Props) {
  const router = useRouter();
  // const id = typeof router.query.id === 'string' ? router.query.id : '0';
  // const { data, isLoading, isError, isSuccess } = useGetPokemonDetailsQuery(id);
  // const detailedData: ISearchResponseItemDetailed = data ? data : {};

  const handleClose = () => {
    router.push('/');
  };

  return (
    <RootLayoutDetails searchResults={searchResults}>
      <div className={styles.detailedCard} data-testid="detailed-card">
        {/* {isLoading && <LoadingSpinner />} */}
        {detailedData && (
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
        {!detailedData && <span>Error in fetch detailed card</span>}
        <span className={styles.detailedCardClose} onClick={handleClose}>
          X
        </span>
        <div className={styles.closeBackground} onClick={handleClose} />
      </div>
    </RootLayoutDetails>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const currentPage = context.query.page || 1;
  const itemsPerPage =
    (typeof context.query.page_size === 'string' && context.query.page_size) || 8;
  const offset = currentPage && itemsPerPage ? (+currentPage - 1) * +itemsPerPage : '0';
  const searchQuery = (typeof context.query.search === 'string' && context.query.search) || '';
  store.dispatch(
    itemsAPI.endpoints.getPokemonList.initiate({
      search: searchQuery,
      itemsPerPage,
      offset,
    })
  );

  store.dispatch(
    itemsAPI.endpoints.getPokemonDetails.initiate(
      typeof context.query.id === 'string' ? context.query.id : '1'
    )
  );

  const arr = await Promise.all(store.dispatch(itemsAPI.util.getRunningQueriesThunk()));
  return {
    props: {
      searchResults: JSON.parse(JSON.stringify(arr[0].data)),
      detailedData: JSON.parse(JSON.stringify(arr[1].data)),
    },
  };
});
