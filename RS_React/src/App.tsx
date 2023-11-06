import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import DetailedCard from './components/DetailedCard/DetailedCard';
import ErrorMessage from './components/ErrorMessage';
import Page404 from './components/Page404';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorMessage />,
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
