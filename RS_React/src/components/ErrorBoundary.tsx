import { Component, ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:  ', error, errorInfo);
  }

  render(): ReactNode {
    return this.state.hasError ? <p>Error occured</p> : this.props.children;
  }
}
