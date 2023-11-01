import { Component, ReactNode } from 'react';

export default class ErrorMessage extends Component {
  handleClick = () => {
    window.location.reload();
  };

  render(): ReactNode {
    return (
      <>
        <p>Error occured</p>
        <button onClick={this.handleClick}>Go back to search</button>
      </>
    );
  }
}
