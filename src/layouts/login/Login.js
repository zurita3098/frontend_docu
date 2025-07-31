import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { form });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      {error && <p>{error}</p>}
      <input type="email" placeholder="Correo" onChange={e => setForm({...form, email: e.target.value})} required />
      <input type="password" placeholder="Contraseña" onChange={e => setForm({...form, password: e.target.value})} required />
      <button type="submit">Ingresar</button>
      <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </form>
  );
};

export default Login;
