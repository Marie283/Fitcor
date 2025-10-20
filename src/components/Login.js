import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { apiFetch } from '../api/base';
import { showToast } from './Toast';

function Login({ onLogin }) {
  // Estados agrupados para mejor organización
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    showPassword: false,
    remember: false
  });

  const [registerState, setRegisterState] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    showPassword: false
  });

  const [uiState, setUiState] = useState({
    showRegister: false
  });

  // Refs para los formularios
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  // Función para guardar token de forma segura
  const saveToken = (token) => {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      // Error al guardar en localStorage
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginState(prev => ({ ...prev, loading: true, error: '' }));
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginState.email, password: loginState.password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        saveToken(data.token);
        onLogin(data.token);  // ← Pasa el token aquí
      } else {
        setLoginState(prev => ({ ...prev, error: data.msg || 'Error de autenticación' }));
      }
    } catch (err) {
      setLoginState(prev => ({ ...prev, error: 'Error de red' }));
    }
    setLoginState(prev => ({ ...prev, loading: false }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterState(prev => ({ ...prev, loading: true, error: '' }));
    try {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registerState.email, password: registerState.password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        saveToken(data.token);
        onLogin(data.token);  // ← Pasa el token aquí
      } else {
        setRegisterState(prev => ({ ...prev, error: data.msg || 'Error al registrar' }));
      }
    } catch (err) {
      setRegisterState(prev => ({ ...prev, error: 'Error de red' }));
    }
    setRegisterState(prev => ({ ...prev, loading: false }));
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: `url(${require('../img/gimnasiomaquinas.jpg')}) center/cover no-repeat`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(15,15,15,0.97)', borderRadius: 22, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', maxWidth: 410, width: '95%', padding: '38px 32px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <img src={require('../img/fitcor logo.png')} alt="Fitcor Logo" style={{ width: 260, marginBottom: 18, marginTop: -10, filter: 'drop-shadow(0 2px 12px rgba(255,145,0,0.25))' }} />
        <div style={{ fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 24, letterSpacing: '-1px', textAlign: 'center' }}>Iniciar sesión</div>
        <form ref={loginFormRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
          <label style={{ color: '#fff', fontWeight: 600, marginBottom: 6, display: 'block', fontSize: 15 }}>Usuario</label>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              type="email"
              placeholder="Email"
              value={loginState.email}
              onChange={e => setLoginState(prev => ({ ...prev, email: e.target.value }))}
          required
              style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid #FFA500', background: '#181818', color: '#fff', fontSize: 16, outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}
        />
          </div>
          <label style={{ color: '#fff', fontWeight: 600, marginBottom: 6, display: 'block', fontSize: 15 }}>Contraseña <span style={{ float: 'right', fontWeight: 400, fontSize: 14 }}><a href="#" style={{ color: '#FFA500', textDecoration: 'none' }}>¿Olvidó su contraseña?</a></span></label>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              type={loginState.showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={loginState.password}
              onChange={e => setLoginState(prev => ({ ...prev, password: e.target.value }))}
            required
              style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid #FFA500', background: '#181818', color: '#fff', fontSize: 16, outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}
          />
          <button
            type="button"
            onClick={() => setLoginState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
              style={{ position: 'absolute', right: 10, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#FFA500', fontWeight: 700, fontSize: 20 }}
            tabIndex={-1}
            aria-label={loginState.showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {loginState.showPassword ? '🙈' : '👁️'}
          </button>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
            <input type="checkbox" id="remember" checked={loginState.remember} onChange={e => setLoginState(prev => ({ ...prev, remember: e.target.checked }))} style={{ accentColor: '#FFA500', width: 18, height: 18, marginRight: 8 }} />
            <label htmlFor="remember" style={{ color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>Recordar datos</label>
          </div>
          {loginState.error && <div style={{ color: '#e53935', marginBottom: 12, textAlign: 'center', fontWeight: 600 }}>{loginState.error}</div>}
        <button
          type="submit"
          disabled={loginState.loading}
            style={{ width: '100%', background: '#FFA500', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 0', fontWeight: 900, fontSize: 18, cursor: loginState.loading ? 'not-allowed' : 'pointer', marginBottom: 10, boxShadow: '0 2px 8px rgba(255,145,0,0.10)', letterSpacing: 1 }}
        >
          {loginState.loading ? 'Entrando...' : 'Iniciar sesión'}
        </button>
          <button
            type="button"
            style={{ width: '100%', background: '#fff', color: '#FFA500', border: '2px solid #FFA500', borderRadius: 14, padding: '14px 0', fontWeight: 700, fontSize: 16, marginBottom: 10, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onClick={() => onLogin('guest')}
          >
            Entrar como invitado
          </button>
      </form>
        <div style={{ marginTop: 10, textAlign: 'center', width: '100%' }}>
        {!uiState.showRegister ? (
            <button type="button" style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }} onClick={() => setUiState(prev => ({ ...prev, showRegister: true }))}>
              ¿No tienes cuenta? <span style={{ color: '#FFA500' }}>Regístrate</span>
          </button>
        ) : (
            <form ref={registerFormRef} onSubmit={handleRegister} style={{ marginTop: 8, width: '100%' }}>
            <input
              type="email"
              placeholder="Email"
              value={registerState.email}
              onChange={e => setRegisterState(prev => ({ ...prev, email: e.target.value }))}
              required
                style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid #FFA500', background: '#181818', color: '#fff', fontSize: 16, outline: 'none', marginBottom: 16 }}
            />
              <div style={{ position: 'relative', marginBottom: 18 }}>
              <input
                type={registerState.showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={registerState.password}
                onChange={e => setRegisterState(prev => ({ ...prev, password: e.target.value }))}
                required
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid #FFA500', background: '#181818', color: '#fff', fontSize: 16, outline: 'none' }}
              />
              <button
                type="button"
                onClick={() => setRegisterState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                  style={{ position: 'absolute', right: 10, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#FFA500', fontWeight: 700, fontSize: 20 }}
                tabIndex={-1}
                aria-label={registerState.showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {registerState.showPassword ? '🙈' : '👁️'}
              </button>
            </div>
              {registerState.error && <div style={{ color: '#e53935', marginBottom: 12, fontWeight: 600 }}>{registerState.error}</div>}
            <button
              type="submit"
              disabled={registerState.loading}
                style={{ width: '100%', background: '#FFA500', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 0', fontWeight: 900, fontSize: 18, cursor: registerState.loading ? 'not-allowed' : 'pointer', marginBottom: 10, boxShadow: '0 2px 8px rgba(255,145,0,0.10)', letterSpacing: 1 }}
            >
              {registerState.loading ? 'Registrando...' : 'Registrarse'}
            </button>
              <button
                type="button"
                style={{ width: '100%', background: '#fff', color: '#FFA500', border: '2px solid #FFA500', borderRadius: 14, padding: '14px 0', fontWeight: 700, fontSize: 16, marginBottom: 10, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onClick={() => onLogin('guest')}
              >
                Entrar como invitado
              </button>
              <button type="button" style={{ marginTop: 10, background: 'none', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }} onClick={() => setUiState(prev => ({ ...prev, showRegister: false }))}>
              Volver al login
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login; 