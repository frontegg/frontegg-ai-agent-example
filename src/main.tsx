import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './app/page'; // Import the Home component
import './styles/globals.css'; // Assuming global styles are here

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home /> {/* Render the Home component */}
  </React.StrictMode>,
); 