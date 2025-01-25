// src/App.jsx
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import { LoadingSpinner } from './components/shared';
import { routes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { healthCheckService } from './services/healthCheck';

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true
};

/**
* Main application component. Sets up routing, authentication, and global toast notifications
*/
const App = () => {
  useEffect(() => {
    // Start health check when app mounts
    healthCheckService.startHealthCheck();

    // Cleanup when app unmounts
    return () => healthCheckService.stopHealthCheck();
  }, []);
  console.log('Current path:', window.location.pathname);
  console.log("Routes being registered:", routes.map(route => ({
    path: route.path,
    element: route.element.type.name
  })));

  return (
  <Router>
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Suspense>
      <ToastContainer {...toastConfig} />
    </AuthProvider>
  </Router>
)};

export default App;