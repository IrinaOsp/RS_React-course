import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../context/Context';
import './Pagination.css';

export default function Pagination() {
  const {
    currentPageNumber,
    updateCurrentPageNumber,
    itemsPerPage,
    updateItemsPerPage,
    queryResponse,
  } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = queryResponse && 'count' in queryResponse ? queryResponse.count : 1;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemsPerPage(+e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateCurrentPageNumber(1);
    setSearchParams({ page: currentPageNumber.toString(), page_size: itemsPerPage.toString() });
  };

  const handlePrevClick = () => {
    if (currentPageNumber > 1) {
      updateCurrentPageNumber(currentPageNumber - 1);
      setSearchParams({
        page: (currentPageNumber - 1).toString(),
        page_size: itemsPerPage.toString(),
      });
    }
  };

  const handleNextClick = () => {
    console.log('next');
    if (currentPageNumber < totalPages) {
      updateCurrentPageNumber(currentPageNumber + 1);
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
