import React, { useState } from 'react';
import MensajeFlotante from '../../components/MensajeFlotante';
import { registerx } from '../../api/authentication';
import './registro.css';

const Registro = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'success' o 'error'
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      setTipoMensaje('error');
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }

    try {
      const result = await registerx(form.username, form.email, form.password);
      if(result.status_code == 201){
        setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
        setTipoMensaje('success');
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
          window.location.href = '/login';
        }, 3000);


      }else{
        setMensaje(result.mensaje);
        setTipoMensaje('error');
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 3000);

       
      }
     
    } catch (err) {
      console.error(err);
      setMensaje('Error al registrar. Verifica los datos.');
      setTipoMensaje('error');
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  };

  return (
    <>
    <div className='register-container' >
      <form onSubmit={handleRegister}>
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Repita Contraseña"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Registrarse</button>
        <button type="button" onClick={() => window.location.href = '/login'}>
          Volver a Iniciar Sesión
        </button>
      </form>

      {mostrarMensaje && <MensajeFlotante texto={mensaje} tipo={tipoMensaje} />}

    </div>
      
    </>
  );
};

export default Registro;
