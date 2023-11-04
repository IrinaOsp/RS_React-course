import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Wrapper from './components/Wrapper';
import ErrorBoundary from './components/ErrorBoundary';
import DetailedCard from './components/DetailedCard/DetailedCard';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: <Wrapper />,
    children: [
      {
        path: ':id',
        element: <DetailedCard />,
      },
    ],
  },
]);

function App(): ReactNode {
  return <RouterProvider router={router} />;
}

export default App;
