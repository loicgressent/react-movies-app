import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/MovieContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>,
)
