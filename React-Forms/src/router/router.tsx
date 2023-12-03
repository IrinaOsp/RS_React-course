import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/main/Main';
import UncontrolledForm from '../pages/uncontrolled/UncontrolledForm';
import ReactHookForm from '../pages/RHF/ReactHookForm';
import Page404 from '../pages/404/Page404';
import FormsList from '../components/FormsList';
import { Fragment } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Page404 />,
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Fragment>
            <FormsList />
          </Fragment>
        ),
      },
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
