import { ChangeEvent, Component } from 'react';

interface ISearchFormProps {
  updateSearchData: (data: TypeSearchResponse) => void;
}

interface ISearchFormState {
  search: string;
}

export type TypeSearchResponse = ISearchResponseItem | ISearchResponseArray | null;
export interface ISearchResponseItem {
  height: number;
  id: number;
  name: string;
  sprites: { front_default: string };
  weight: number;
}
interface ISearchResponseArray {
  results: TypeSearchResponseArray;
}
export type TypeSearchResponseArray = ISearchArrayItem[];
interface ISearchArrayItem {
  name: string;
  url: string;
}

export class SearchForm extends Component<ISearchFormProps, ISearchFormState> {
  constructor(props: ISearchFormProps) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentDidMount(): void {
    this.setState({
      search: localStorage.getItem('search') || '',
    });
  }
  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
  };
  handleSearch = () => {
    localStorage.setItem('search', this.state.search);
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
      .then((res) => {
        if (!res.ok) throw new Error(`fetch error with status ${res.status}`);
        return res.json();
      })
      .then((data: TypeSearchResponse) => {
        console.log(data);
        this.props.updateSearchData(data);
      })
      .catch((error) => {
        console.error('Error ', error);
        this.props.updateSearchData(null);
      });
  };
  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  };
  render() {
    return (
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter text"
          value={this.state.search}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </form>
    );
  }
}
