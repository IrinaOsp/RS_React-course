import { Component, ReactNode } from 'react';
import { SearchForm, TypeSearchResponse } from './SearchForm';
import SearchResults from './SearchResults';

interface IWrapperState {
  searchData: TypeSearchResponse | null;
}

export default class Wrapper extends Component<object, IWrapperState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchData: null,
    };
  }

  updateSearchData = (data: TypeSearchResponse) => {
    this.setState({ searchData: data });
  };

  render(): ReactNode {
    return (
      <div className="wrapper">
        <SearchForm updateSearchData={this.updateSearchData} />
        <SearchResults data={this.state.searchData} />
      </div>
    );
  }
}
