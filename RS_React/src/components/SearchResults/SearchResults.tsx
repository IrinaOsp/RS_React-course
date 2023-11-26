import Card from '../Card/Card';
import { ISearchArrayItem, ISearchResponseArray } from '../../types/types';
import styles from './SearchResults.module.css';

type SearchResultsProps = {
  data: ISearchArrayItem | ISearchResponseArray;
};

export default function SearchResults({ data }: SearchResultsProps) {
  const queryResponse: ISearchArrayItem[] = data && 'results' in data ? data.results : [data];

  return (
    <div className={styles.mainSection}>
      <div className={styles.searchResults}>
        {data && queryResponse.map((item) => <Card key={item.name} {...item} />)}
        {!data && <p>No search results</p>}
      </div>
    </div>
  );
}
