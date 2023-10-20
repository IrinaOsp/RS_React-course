import { Component, ReactNode } from 'react';
import { ISearchResponseItem, TypeSearchResponse } from './SearchForm';

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
    console.log('update');
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }
  async loadData() {
    console.log('load');

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
      console.log(renderData);
    }
    if (data && 'id' in data) {
      this.setState({ renderData: [data], isLoading: false });
    }
  }

  render(): ReactNode {
    const { data } = this.props;
    const { renderData, isLoading } = this.state;
    console.log(data, renderData, isLoading);
    return (
      <div className="search-results">
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          data &&
          renderData &&
          renderData.map((item) => (
            <div key={item.name}>
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
