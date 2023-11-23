import Link from 'next/link';
import { baseURL } from '../../data/data';
import { ISearchArrayItem, ISearchResponseItemDetailed } from '../../types/types';
import styles from './Card.module.css';

export default function Card(data: ISearchArrayItem | ISearchResponseItemDetailed) {
  // id from url https://pokeapi.co/api/v2/pokemon/1/
  const id = 'url' in data ? data.url.substring(baseURL.length).slice(0, -1) : data.id;

  return (
    <Link href={`/${id}`} style={{ color: 'inherit' }}>
      <div className={styles.searchItem}>
        <span>Name: {data.name}</span>
        <span>ID: {id || id}</span>
      </div>
    </Link>
  );
}
