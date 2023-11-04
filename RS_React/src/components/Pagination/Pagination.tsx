import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

export default function Pagination() {
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState('1');
  const [searchParams, setSearchParams] = useSearchParams({
    page: currentPage,
    page_size: itemsPerPage,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(e.target.value);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setSearchParams({ page: currentPage, page_size: itemsPerPage });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  };

  const handlePrevClick = () => {
    if (+currentPage > 1) {
      setCurrentPage((prevPage) => (+prevPage - 1).toString());
      setSearchParams({ page: (+currentPage - 1).toString(), page_size: itemsPerPage });
    }
  };

  const handleNextClick = () => {
    // TODO: limit last page
    // if (+currentPage > 1) {
    setCurrentPage((prevPage) => (+prevPage + 1).toString());
    setSearchParams({ page: (+currentPage + 1).toString(), page_size: itemsPerPage });
    // }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={+currentPage === 1}>
        prev
      </button>
      <span>{searchParams.get('page')}</span>
      <button onClick={handleNextClick}>next</button>
      Items per page
      <form>
        <input
          type="number"
          name="items"
          id="items-per-page"
          min={1}
          max={100}
          value={itemsPerPage}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button type="submit" onClick={handleClick}>
          Change items number
        </button>
      </form>
    </div>
  );
}
