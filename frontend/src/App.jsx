import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import MapView from './pages/MapView';
import Vendor from './pages/Vendor';
import VendorRequest from './pages/VendorRequest';
import VendorList from './pages/VendorList';
import VendorView from './pages/VendorView';
import AddVendor from './pages/AddVendor';
import Delivery from './pages/Delivery';
import Shipping from './pages/Shipping';
import Admin from './pages/Admin';
import AddFood from './pages/AddFood';
import AddOrder from './pages/AddOrder';
import ProfileSettings from './pages/ProfileSettings';
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
          <Route path="map" element={<MapView />} />
          <Route path="vendor" element={<Navigate to="request" replace />} />
          <Route path="vendor/:id" element={<VendorView />} />
          <Route path="vendor/:id/food/add" element={<AddFood />} />
          <Route path="vendor/:id/order/add" element={<AddOrder />} />
          <Route path="vendor/request" element={<VendorRequest />} />
          <Route path="vendor/list" element={<VendorList />} />
          <Route path="vendor/add" element={<AddVendor />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="admin" element={<Admin />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
