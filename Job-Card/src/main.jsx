import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import BrowseRouter from './BrowseRouter/BroweRouter.jsx'; // Correct spelling if necessary
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-mrw6h6cdf6hki32z.us.auth0.com"
      clientId="2QGBh9lskfD1Mis2zRXgR838XlQ4aAhi"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={BrowseRouter} />
      
    </Auth0Provider>
  </StrictMode>
);
