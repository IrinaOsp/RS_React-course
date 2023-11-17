import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types/types';
import ErrorMessage from './ErrorMessage';

export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:  ', error, errorInfo);
  }

  render(): ReactNode {
    return <ErrorMessage />;
  }
}
