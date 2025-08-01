import config from '../config.json';

const token = localStorage.getItem('token');

export async function getSolicitudes(usuario_id) {
  try {
    const response = await fetch(`${config.urlAPI}/solicitudes/get?usuario_id=${usuario_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    console.log(data)

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
}

export async function saveSolicitud(usuario_id, cedula, telefono, tipo, comentario, cedula_jpg_file, estado) {
  try {
    const formData = new FormData();
    formData.append('usuario_id', usuario_id);
    formData.append('cedula', cedula);
    formData.append('telefono', telefono);
    formData.append('tipo', tipo);
    formData.append('comentario', comentario);
    formData.append('estado', estado);
    formData.append('cedula_jpg', cedula_jpg_file);  // este debe ser tipo File

    const response = await fetch(`${config.urlAPI}/solicitudes/post`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // ¡NO pongas 'Content-Type'! Fetch lo pone automáticamente con FormData
      },
      body: formData
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al registrar solicitud:', error);
  }
}

export async function deleteSolicitud(usuario_id, id) {
  try {
    const response = await fetch(`${config.urlAPI}/solicitudes/delete?usuario_id=${usuario_id}&id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
}
