import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './app/page'; // Import the Home component
import './styles/globals.css'; // Assuming global styles are here
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
	baseUrl: import.meta.env.VITE_FRONTEGG_BASE_URL!,
	clientId: import.meta.env.VITE_FRONTEGG_CLIENT_ID!,
	appId: import.meta.env.VITE_FRONTEGG_AGENT_ID!
};


const authOptions = {
  keepSessionAlive: true
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FronteggProvider
      contextOptions={contextOptions}
      hostedLoginBox={true}
      authOptions={authOptions}
    >
      <Home /> {/* Render the Home component */}
    </FronteggProvider>
  </React.StrictMode>,
); 