import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      console.error(err);
      setSuccess('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <input type="text" placeholder="Nombre de usuario" onChange={e => setForm({...form, username: e.target.value})} required />
      <input type="email" placeholder="Correo" onChange={e => setForm({...form, email: e.target.value})} required />
      <input type="password" placeholder="Contraseña" onChange={e => setForm({...form, password: e.target.value})} required />
      <button type="submit">Registrarse</button>
      {success && <p>{success}</p>}
      <button type="button" onClick={() => window.location.href = '/login'}>Volver a Iniciar Sesión</button>
    </form>
  );
};

export default Registro;
