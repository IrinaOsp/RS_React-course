import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types/types';

export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:  ', error, errorInfo);
  }

  render(): ReactNode {
    return this.state.hasError ? <h1>Error occured</h1> : this.props.children;
  }
}
