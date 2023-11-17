import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { decrement, increment, setToNumber } from '../../state/pagination/paginationSlice';
import { defaultItemsPerPage } from '../../data/data';
import { useGetPokemonListQuery } from '../../api/itemsAPI';
import './Pagination.css';

export default function Pagination() {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);
  const dispatch = useDispatch();

  if (searchParams.get('page')) {
    dispatch(setToNumber({ key: 'currentPage', value: +searchParams.get('page')! }));
  }
  if (searchParams.get('page_size')) {
    dispatch(setToNumber({ key: 'itemsPerPage', value: +searchParams.get('page_size')! }));
  }

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
    setSearchParams({ page: '1', page_size: itemsPerPage.toString() });
  };

  const handlePrevClick = () => {
    if (currentPageNumber > 1) {
      dispatch(decrement());
      setSearchParams({
        page: (currentPageNumber - 1).toString(),
        page_size: itemsPerPage.toString(),
      });
    }
  };

  const handleNextClick = () => {
    if (currentPageNumber < totalPages) {
      dispatch(increment());
      setSearchParams({
        page: (currentPageNumber + 1).toString(),
        page_size: itemsPerPage.toString(),
      });
    }
  };

  return (
    <div className="pagination">
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
        />
        <button type="submit">Change items number</button>
      </form>
    </div>
  );
}
