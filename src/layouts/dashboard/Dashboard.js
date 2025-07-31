import React, { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [vista, setVista] = useState('crear');

  const renderVista = () => {
    switch (vista) {
      case 'crear':
        return <CrearSolicitud />;
      case 'ver':
        return <VerSolicitudes />;
      default:
        return <Bienvenida />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="perfil">
          <div className="avatar">👤</div>
          <div className="nombre">Usuario</div>
        </div>
        <nav className="menu">
          <button onClick={() => setVista('crear')}>➕ Crear Solicitud</button>
          <button onClick={() => setVista('ver')}>📄 Ver Solicitudes</button>
        </nav>
      </aside>
      <main className="contenido">
        {renderVista()}
      </main>
    </div>
  );
};

const CrearSolicitud = () => {
  const [formulario, setFormulario] = useState({
    cedula: '',
    telefono: '',
    tipo: '',
    cedulaFoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cedulaFoto') {
      setFormulario({ ...formulario, [name]: files[0] });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cedula', formulario.cedula);
    formData.append('telefono', formulario.telefono);
    formData.append('tipo', formulario.tipo);
    formData.append('cedulaFoto', formulario.cedulaFoto);
    console.log('Formulario enviado:', formulario);
    // Aquí podrías enviar `formData` al backend si lo deseas
  };

  return (
    <div className="vista-container">
      <h2>Crear Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={formulario.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Tipo de Solicitud:</label>
          <select
            name="tipo"
            value={formulario.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="0">Certificado de Nacimiento</option>
            <option value="1">Récord Policivo</option>
            <option value="2">Acta de matrimonio Civil</option>
          </select>
        </div>

        <div>
          <label>Adjuntar foto de cédula:</label>
          <input
            type="file"
            name="cedulaFoto"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

const VerSolicitudes = () => {
  const solicitudes = [
    { tipo: 'Certificado de bautismo', observacion: 'Necesario para matrimonio', estado: 'Pendiente' },
  ];

  return (
    <div className="vista-container">
      <h2>Ver Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Observación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((sol, idx) => (
            <tr key={idx}>
              <td>{sol.tipo}</td>
              <td>{sol.observacion}</td>
              <td>{sol.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Bienvenida = () => (
  <div>
    <h2>Bienvenido al Dashboard</h2>
  </div>
);

export default Dashboard;
