// Resolver de baseURL para el backend sin hardcodear puertos
export function getApiBaseUrl() {
  // 1) Prioriza variable de entorno (Vite o CRA)
  let viteUrl;
  try {
    viteUrl = import.meta.env && import.meta.env.VITE_API_URL;
  } catch (_e) {
    viteUrl = undefined;
  }
  const craUrl = typeof process !== 'undefined' ? process.env.REACT_APP_API_URL : undefined;
  const envUrl = viteUrl || craUrl;
  if (envUrl) return String(envUrl).replace(/\/$/, '');

  // 2) Si el frontend está servido por el mismo host, usa mismo origen
  if (typeof window !== 'undefined' && window.location) {
    const { protocol, hostname, port } = window.location;
    // Si estamos en 3000 (CRA), intenta 5000; si no, usa mismo origen
    if (port === '3000') return `${protocol}//${hostname}:5000`;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  // 3) Fallback local
  return 'http://localhost:5000';
}

export async function apiFetch(path, options = {}, token = null) {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  
  // Headers por defecto
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Agregar token de autenticación si existe (pasado como parámetro)
  if (token) {
    defaultHeaders['x-auth-token'] = token;
  }

  // Combinar headers
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log('🌐 API Request:', {
    url,
    method: finalOptions.method || 'GET',
    hasToken: !!token,
    headers: finalOptions.headers
  });

  try {
    const response = await fetch(url, finalOptions);
    
    console.log('📡 API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    });

    // Si la respuesta no es OK, intentar extraer el mensaje de error
    if (!response.ok) {
      let errorMsg = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.msg || errorData.message || errorMsg;
      } catch (_e) {
        // Si no hay JSON, usar mensaje por defecto
      }
      throw new Error(errorMsg);
    }

    return response;
  } catch (error) {
    throw error;
  }
}