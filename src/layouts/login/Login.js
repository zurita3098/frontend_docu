import React, { useState } from 'react';
import { Loginx } from '../../api/authentication';
import MensajeFlotante from '../../components/MensajeFlotante/index'; // ajusta la ruta si está en otra carpeta
import './login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Loginx(form.email, form.password);
      // Redirigir a la página de inicio después de iniciar sesión
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas');
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000); // Oculta mensaje luego de 3 segundos
    }
  };

  return (
    <>
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Ingresar</button>
        <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
      </form>

      {mostrarMensaje && <MensajeFlotante texto={error} tipo="error" />}

      </div>
      
    </>
  );
};

export default Login;
