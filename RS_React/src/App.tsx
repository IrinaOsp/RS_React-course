import { ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import DetailedCard from './components/DetailedCard/DetailedCard';
import ErrorMessage from './components/ErrorMessage';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorMessage />,
    element: <Main />,
    children: [
      {
        path: ':id',
        element: <DetailedCard />,
        // children: [
        //   {
        //     path: '*',
        //     action:
        //   }
        // ]
      },
    ],
  },
]);

function App(): ReactNode {
  return <RouterProvider router={router} />;
}

export default App;
