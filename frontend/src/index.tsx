import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LazyAbout } from './pages/about/AboutLazy';
import { LazyUser } from './pages/user/UserLazy';
import { Suspense } from 'react';


const root = document.getElementById('root');

if (!root) {
  throw new Error('no root');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element:
          <Suspense fallback={'Loading....'}>
            <LazyAbout />
          </Suspense>
      },
      {
        path: "/user",
        element:
          <Suspense fallback={'Loading....'}>
            <LazyUser />
          </Suspense>
      }
    ]
  },
]);

const container = ReactDOM.createRoot(root);

container.render(<RouterProvider router={router} />);