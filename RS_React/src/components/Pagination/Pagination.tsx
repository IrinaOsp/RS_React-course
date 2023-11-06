import { useState } from 'react';
import { defaultItemsPerPage } from '../../data/data';
import { IPaginationProps } from '../../types/types';
import './Pagination.css';

export default function Pagination(props: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState('1');
  const searchParams = props.searchParams;
  const setSearchParams = props.setSearchParams;
  const totalPages = props.count;
  const [itemsPerPage, setItemsPerPage] = useState(
    searchParams.get('page_size') || defaultItemsPerPage
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(e.target.value);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setCurrentPage('1');
    setSearchParams({ page: '1', page_size: itemsPerPage });
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
    if (+currentPage < totalPages) {
      setCurrentPage((prevPage) => (+prevPage + 1).toString());
      setSearchParams({ page: (+currentPage + 1).toString(), page_size: itemsPerPage });
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={+currentPage === 1}>
        prev
      </button>
      <span>{searchParams.get('page') || 1}</span>
      <button onClick={handleNextClick} disabled={+currentPage >= totalPages / +itemsPerPage}>
        next
      </button>
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
