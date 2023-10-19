import { Component, ReactNode } from 'react';

interface ISearchResultsProps {
  data: unknown;
}
export default class SearchResults extends Component<ISearchResultsProps> {
  render(): ReactNode {
    const { data } = this.props;

    return <div>{data ? <p>{Object.keys(data)}</p> : <p>No search results</p>}</div>;
  }
}
