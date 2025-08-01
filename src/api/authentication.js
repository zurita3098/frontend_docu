import config from '../config.json';

export async function Loginx(email, password) {
  try {
    const response = await fetch(`${config.urlAPI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('usuario_id', data.usuario_id);
      return data;
    } else {
      throw new Error(data.detail || 'Error al iniciar sesión');
    }
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
}

export async function registerx(username, email, password) {
  try {
    const response = await fetch(`${config.urlAPI}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    return data;
    
  } catch (error) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
}
