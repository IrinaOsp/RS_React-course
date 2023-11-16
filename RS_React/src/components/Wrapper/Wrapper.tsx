import { ReactNode, useContext, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { defaultItemsPerPage } from '../../data/data';
// import { TypeSearchResponse } from '../../types/types';
import { SearchContext } from '../../context/Context';
// import { useGetItemsQuery, useGetPokemonListQuery } from '../../api/itemsAPI';

export default function Wrapper(): ReactNode {
  const { updateSearchText, updateCurrentPageNumber, updateItemsPerPage } =
    useContext(SearchContext);
  // const [searchData, setSearchData] = useState<TypeSearchResponse | null>(null);
  // const [totalItems, setTotalItems] = useState<number>(0);
  const [searchParams] = useSearchParams();

  // const updateSearchData = (data: TypeSearchResponse | null) => {
  //   setSearchData(data);
  // };
  const limit = searchParams.get('page_size') || defaultItemsPerPage;
  const page = searchParams.get('page') || 1;
  // const offset = page && limit ? (+page - 1) * +limit : '0';
  // const {data, isLoading, isError} = useGetPokemonListQuery();

  useEffect(() => {
    updateItemsPerPage(+limit);
    updateCurrentPageNumber(+page);
    const searchQuery = searchParams.get('search') || '';
    updateSearchText(searchQuery || localStorage.getItem('search') || '');
    /*
    fetch(`${baseURL}${searchQuery}?limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (!res.ok) throw new Error(`fetch error with status ${res.status}`);
        return res.json();
      })
      .then((data: TypeSearchResponse) => {
        if (data && 'count' in data) {
          updateQueryResponse({ count: data.count, results: data.results });
          // setTotalItems(data.count);
        } else if (data && 'height' in data) {
          updateQueryResponse(data);
          // setTotalItems(1);
        }
        // updateSearchData(data);
      })
      .catch((error) => {
        console.error('Error ', error);
        updateQueryResponse({ count: 1, results: [] });
      });
      */
  }, [searchParams]);

  return (
    <div className="wrapper">
      <SearchForm
      // updateSearchData={updateSearchData}
      // setSearchParams={setSearchParams}
      // searchParams={searchParams}
      />
      <Pagination
      // setSearchParams={setSearchParams}
      // searchParams={searchParams}
      // count={totalItems}
      />
      <SearchResults />
    </div>
  );
}
