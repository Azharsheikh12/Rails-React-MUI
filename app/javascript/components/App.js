import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
console.log({isAuthenticated})
useEffect(()=>{
   !!localStorage.getItem('authToken');

},[]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
   <Route
          path="/dashboard"
          element={ <Dashboard />}
        />
        <Route
          path="/login"
          element={ <Login />}
        />

        <Route
          path="/signup"
          element={ <Signup />}
        />
      </Routes>
    </Router>
  );
};

export default App;


