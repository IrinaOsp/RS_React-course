import { Component, ReactNode } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface IWrapperState {
  searchData: unknown;
}
export default class Wrapper extends Component<object, IWrapperState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchData: null,
    };
  }
  updateSearchData = (data: unknown) => {
    this.setState({ searchData: data });
  };
  render(): ReactNode {
    return (
      <div>
        <SearchForm updateSearchData={this.updateSearchData} />
        <SearchResults data={this.state.searchData} />
      </div>
    );
  }
}
