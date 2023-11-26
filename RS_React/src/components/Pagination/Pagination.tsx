'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { decrement, increment, setToNumber } from '../../state/pagination/paginationSlice';
import { useGetPokemonListQuery } from '../../api/itemsAPI';
import styles from './Pagination.module.css';
import { useRouter } from 'next/router';

export default function Pagination() {
  const router = useRouter();
  const urlPageQuery = router.query.search || '';
  const urlPageSizeQuery = router.query.search || '';
  const dispatch = useDispatch();

  if (urlPageQuery && typeof urlPageQuery === 'string') {
    dispatch(setToNumber({ key: 'currentPage', value: +urlPageQuery }));
  }
  if (urlPageSizeQuery && typeof urlPageSizeQuery === 'string') {
    dispatch(setToNumber({ key: 'itemsPerPage', value: +urlPageSizeQuery }));
  }
  const [itemsPerPage, setItemsPerPage] = useState(
    useSelector((state: RootState) => state.pagination.itemsPerPage)
  );
  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);

  const offset = currentPageNumber && itemsPerPage ? (+currentPageNumber - 1) * +itemsPerPage : '0';
  const search = useSelector((state: RootState) => state.search.searchText);
  const { data } = useGetPokemonListQuery({ search, itemsPerPage, offset });
  const totalPages = data && 'count' in data ? data.count : 1;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(+e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setToNumber({ key: 'currentPage', value: 1 }));
    dispatch(setToNumber({ key: 'itemsPerPage', value: itemsPerPage }));
    router.push(`/?page=1&page_size=${itemsPerPage}`);
  };

  const handlePrevClick = () => {
    if (currentPageNumber > 1) {
      dispatch(decrement());
      router.push(`/?page=${currentPageNumber - 1}&page_size=${itemsPerPage}`);
    }
  };

  const handleNextClick = () => {
    if (currentPageNumber < totalPages) {
      dispatch(increment());
      router.push(`/?page=${currentPageNumber + 1}&page_size=${itemsPerPage}`);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevClick} disabled={currentPageNumber === 1}>
        prev
      </button>
      <span>{currentPageNumber || 1}</span>
      <button onClick={handleNextClick} disabled={currentPageNumber >= totalPages / +itemsPerPage}>
        next
      </button>
      Items per page
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="items"
          id="items-per-page"
          min={1}
          max={100}
          value={itemsPerPage}
          onChange={handleChange}
          className={styles.itemsPerPage}
        />
        <button type="submit">Change items number</button>
      </form>
    </div>
  );
}
