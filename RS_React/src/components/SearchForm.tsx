import { ChangeEvent, Component } from 'react';

interface ISearchFormProps {
  updateSearchData: (data: unknown) => void;
}

interface ISearchFormState {
  search: string;
}

export default class SearchForm extends Component<ISearchFormProps, ISearchFormState> {
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
      .then((data) => this.props.updateSearchData(data))
      .catch((error) => {
        console.error('Error ', error);
      });
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
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </form>
    );
  }
}
