import { Component, ReactNode } from 'react';
import { ISearchResponseItem, TypeSearchResponse } from './SearchForm';
import './styles/SearchResults.css';

interface ISearchResultsProps {
  data: TypeSearchResponse;
}
interface ISearchResultsState {
  renderData: ISearchResponseItem[] | null;
  isLoading: boolean;
}
export default class SearchResults extends Component<ISearchResultsProps, ISearchResultsState> {
  constructor(props: ISearchResultsProps) {
    super(props);
    this.state = {
      renderData: null,
      isLoading: false,
    };
  }
  componentDidUpdate(prevProps: Readonly<ISearchResultsProps>): void {
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }
  async loadData() {
    const { data } = this.props;
    this.setState({ isLoading: true });
    if (data && 'results' in data) {
      const renderData: ISearchResponseItem[] = await Promise.all(
        data.results.map(async (item) => {
          try {
            const response = await fetch(item.url);
            return response.ok ? response.json() : null;
          } catch (error) {
            console.error('fetch error: ', error);
            return null;
          }
        })
      );
      this.setState({ renderData, isLoading: false });
    }
    if (data && 'id' in data) {
      this.setState({ renderData: [data], isLoading: false });
    }
    if (data === null) this.setState({ isLoading: false });
  }

  render(): ReactNode {
    const { data } = this.props;
    const { renderData, isLoading } = this.state;
    return (
      <div className="search-results">
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          data &&
          renderData &&
          renderData.map((item) => (
            <div key={item.name} className="search-item">
              <span>Name: {item.name}</span>
              <span>ID: {item.id}</span>
              <span>Height: {item.height}</span>
              <span>Weight: {item.weight}</span>
              <div>
                <img src={item.sprites.front_default} alt="img" />
              </div>
            </div>
          ))}
        {!isLoading && !data && <p>No search results</p>}
      </div>
    );
  }
}
