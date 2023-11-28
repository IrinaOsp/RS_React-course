import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/main/Main';
import UncontrolledForm from '../pages/uncontrolled/UncontrolledForm';
import ReactHookForm from '../pages/RHF/ReactHookForm';
import Page404 from '../pages/404/Page404';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Page404 />,
    element: <Main />,
    children: [
      {
        path: 'uncontrolled',
        element: <UncontrolledForm />,
      },
      {
        path: 'react-hook-form',
        element: <ReactHookForm />,
      },
    ],
  },
]);

export default router;
