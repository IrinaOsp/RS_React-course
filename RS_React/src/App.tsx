import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main';
import DetailedCard from './components/DetailedCard/DetailedCard';
import Page404 from './components/Page404/Page404';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: <Main />,
    children: [
      {
        path: ':id',
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
  return <RouterProvider router={router} />;
}

export default App;
