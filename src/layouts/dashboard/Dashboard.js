import React, { useState, useEffect } from 'react';
import './dashboard.css';
import {getSolicitudes, saveSolicitud, deleteSolicitud} from '../../api/solicitudes';
const Dashboard = () => {
  const [vista, setVista] = useState('crear');

  const renderVista = () => {
    switch (vista) {
      case 'crear':
        return <CrearSolicitud />;
      case 'ver':
        return <VerSolicitudes />;
      case 'logout':
      // Eliminar token y redirigir
      localStorage.removeItem('token');
      window.location.href = '/login'; // o usa navigate('/login') si estás usando React Router
      return null;
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
          <button onClick={() => setVista('logout')}> Cerrar Sesión</button>
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
    comentario: '',
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

 const handleSubmit = async (e) => {
  e.preventDefault();

//   const formData = new FormData();
//   formData.append('cedula', formulario.cedula);
//   formData.append('telefono', formulario.telefono);
//   formData.append('tipo', formulario.tipo);
//   formData.append('cedulaFoto', formulario.cedulaFoto); // esto debe ser un archivo
//   formData.append('comentario', formulario.comentario);

  try {
    console.log(formulario.cedulaFoto)
    const result = await saveSolicitud(
      localStorage.getItem('usuario_id'),
      formulario.cedula,
      formulario.telefono,
      formulario.tipo,
      formulario.comentario,
      formulario.cedulaFoto,
      0
    );

    if (result.status_code == 201) {
      alert('Solicitud enviada exitosamente');
      setFormulario({
        cedula: '',
        telefono: '',
        tipo: '',
        comentario: '',
        cedulaFoto: null,
      });
    } else {
      console.log(result)
      alert('Error al enviar la solicitud 1');
    }
  } catch (error) {
    console.error('Error al enviar:', error);
  }
};

  return (
    <div className="vista-container">
      
      <form onSubmit={handleSubmit}>
        <h2>Crear Solicitud</h2>
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
          <label>Comentario:</label>
          <input
            type="text"
            name= "comentario"
            value={formulario.comentario}
            onChange={handleChange}
            required
          />
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
  const [solicitudes, setSolicitudes] = useState([]);

  const tipoSolicitud = {
  0: 'Certificado de Nacimiento',
  1: 'Récord Policivo',
  2: 'Acta de matrimonio Civil'
};

 const estados = {
    0: 'Pendiente',
    1: 'Aprobada',
    2: 'Rechazada'
 }

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const usuario_id = localStorage.getItem('usuario_id')
        console.log("usuario")
        console.log(usuario_id)
        const data = await getSolicitudes(usuario_id);
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleDescargar = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="vista-container">
      <h2>Ver Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Comentario</th>
            <th>Estado</th>
            <th>Observación</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
        {solicitudes.length > 0 ? (
            solicitudes.map((sol, idx) => (
            <tr key={idx}>
                <td>{tipoSolicitud[sol.tipo] ?? sol.tipo}</td>
                <td>{sol.comentario}</td>
                <td>{estados[sol.estado] ?? sol.estado}</td>
                <td>{sol.observacion}</td>
                <td>
                {sol.documento_url ? (
                    <button onClick={() => handleDescargar(sol.documento_url)}>
                    Descargar
                    </button>
                ) : (
                    'No disponible'
                )}
                </td>
            </tr>
            ))
        ) : null}
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
