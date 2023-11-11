import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import DetailedCard from './components/DetailedCard/DetailedCard';
import Page404 from './components/Page404/Page404';
import ErrorBoundary from './components/ErrorBoundary';
import { SearchState } from './context/Context';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: <Main />,
    children: [
      {
        path: ':id(\\d+)',
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

function App(): ReactNode {
  return (
    <SearchState>
      <RouterProvider router={router} />
    </SearchState>
  );
}

export default App;
