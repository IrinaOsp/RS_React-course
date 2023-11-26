import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types/types';

export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:  ', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <p>Error occurred</p>
          <button onClick={() => this.setState({ hasError: false })}>Go back to search</button>
        </>
      );
    }
    return this.props.children;
  }
}
