import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import React from 'react';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
  loader as contactLoader,
} from './routes/contact';
import ContactEdit, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';
const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
  loader: rootLoader,
  action: rootAction,
  children: [
    {
      index: true,
      element: <Index />,
    },
    {
      path: 'contacts/:contactId/destroy',
      action: destroyAction,
      errorElement: <> !!! this a error !!!</>,
    },
    {
      path: "contacts/:contactId",
      element: <Contact />,
      loader: contactLoader,
    },
    {
      path: "contacts/:contactId/edit",
      element: <ContactEdit />,
      loader: contactLoader,
      action: editAction,
    }
  ],
},
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // }
]);
export default function Main() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
