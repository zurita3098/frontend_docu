import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './layouts/login/Login';
import Register from './layouts/login/Registro';
import Dashboard from './layouts/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
