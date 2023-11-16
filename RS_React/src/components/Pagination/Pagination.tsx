import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../context/Context';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { decrement, increment, setToNumber } from '../../state/pagination/paginationSlice';

export default function Pagination() {
  const {
    // currentPageNumber,
    // updateCurrentPageNumber,
    // itemsPerPage,
    // updateItemsPerPage,
    queryResponse,
  } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNumber = useSelector((state: RootState) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);
  const dispatch = useDispatch();

  const totalPages = queryResponse && 'count' in queryResponse ? queryResponse.count : 1;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // updateItemsPerPage(+e.target.value);
    dispatch(setToNumber(+e.target.value));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setToNumber(1));
    setSearchParams({ page: currentPageNumber.toString(), page_size: itemsPerPage.toString() });
  };

  const handlePrevClick = () => {
    if (currentPageNumber > 1) {
      dispatch(decrement());
      setSearchParams({
        page: currentPageNumber.toString(),
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
      <span>{searchParams.get('page') || 1}</span>
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
