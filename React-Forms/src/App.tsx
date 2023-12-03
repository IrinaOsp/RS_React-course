import { ReactNode } from 'react';
import router from './router/router';
import './App.css';
import { RouterProvider } from 'react-router-dom';

function App(): ReactNode {
  return <RouterProvider router={router} />;
}

export default App;
