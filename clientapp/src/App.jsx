import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './pages/SalesDashboard';
import SalesRepList from './pages/SalesRepList';
import SalesRepForm from './pages/SalesRepForm';
import './App.css';
import HomePage from './pages/HomePage';
import NavBar from './component/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from "./providers/AuthProvider";
import ProtectedRoute from "./route/ProtectedRoute";
import Layout from "./component/Layout";

const App = () => {
  return (
      
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <SalesDashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/salesreps"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <SalesRepList />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/salesreps/new"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <SalesRepForm />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/salesreps/edit/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <SalesRepForm />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
