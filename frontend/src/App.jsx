import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to Login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Dashboard Layout Protected Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<UserList />} />
          <Route path="user/:id" element={<UserDetail />} />
          {/* Add more nested routes like /dashboard/vendor here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
