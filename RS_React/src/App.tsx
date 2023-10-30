import { Component, ReactNode } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <Wrapper />
      </ErrorBoundary>
    );
  }
}

export default App;
