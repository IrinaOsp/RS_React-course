import { Component } from 'react';

export default class ThrowErrorButton extends Component {
  state = {
    throwError: false,
  };
  handleError = (): void => {
    this.setState({
      throwError: true,
    });
  };
  render() {
    const { throwError } = this.state;
    if (throwError) throw Error('ErrorBoundary should catch this error');
    return (
      <button type="button" onClick={this.handleError}>
        Throw Error
      </button>
    );
  }
}
