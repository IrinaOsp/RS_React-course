import { ReactNode, useState } from 'react';
import { SearchForm, TypeSearchResponse } from './SearchForm';
import SearchResults from './SearchResults';

export default function Wrapper(): ReactNode {
  const [searchData, setSearchData] = useState<TypeSearchResponse | null>(null);

  const updateSearchData = (data: TypeSearchResponse | null) => {
    setSearchData(data);
  };

  return (
    <div className="wrapper">
      <SearchForm updateSearchData={updateSearchData} />
      <SearchResults data={searchData} />
    </div>
  );
}
