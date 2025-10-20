import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BadgeBanner from './components/BadgeBanner';
import WeekVisits from './components/WeekVisits';
import FeaturedWorkout from './components/FeaturedWorkout';
import CoachTips from './components/CoachTips';
import BenefitsBanner from './components/BenefitsBanner';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Home from './components/Home';
import { ToastProvider } from './components/Toast';
import './components/Home.css';

// Lazy loading para mejorar rendimiento
const Perfil = lazy(() => import('./paginas/perfil'));
const Entrenamiento = lazy(() => import('./paginas/entrenamiento'));
const Progreso = lazy(() => import('./paginas/progreso'));
const Clubs = lazy(() => import('./paginas/clubs'));
const Temporizador = lazy(() => import('./paginas/temporizador'));
const CrearRutina = lazy(() => import('./paginas/crearrutina'));

// Componente principal de la aplicación
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado agrupado para mejor organización
  const [appState, setAppState] = useState({
    fotoPerfil: null,
    memberID: '',
    tempoConfig: {
      esfuerzo: 20,
      descanso: 10,
      ejercicios: 8,
      rondas: 2,
      reposo: 60,
      sonido: true,
    },
    showTempo: false,
    rutinas: []
  });

  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  // Verificar autenticación al cargar
  useEffect(() => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    setToken(savedToken);
    setIsLogged(true);
  }
}, []);

  // Función para manejar cambios de navegación
  const handleTabChange = (tab) => {
    setAppState(prev => ({ ...prev, showTempo: false }));
    
    switch (tab) {
      case 'inicio':
        navigate('/');
        break;
      case 'perfil':
        navigate('/perfil');
        break;
      case 'entrenamiento':
        navigate('/entrenamiento');
        break;
      case 'progreso':
        navigate('/progreso');
        break;
      case 'clubs':
        navigate('/clubs');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  setToken(null);
  setIsLogged(false);
  navigate('/');
};

  // Obtener tab activa basada en la ruta actual
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'inicio';
    if (path === '/perfil') return 'perfil';
    if (path === '/entrenamiento') return 'entrenamiento';
    if (path === '/progreso') return 'progreso';
    if (path === '/clubs') return 'clubs';
    return 'inicio';
  };

  if (!isLogged) {
  return <Login onLogin={(newToken) => {
    setToken(newToken);
    setIsLogged(true);
  }} />;
}

  return (
    <div className="main-container with-bottom-bar">
      <Header 
        onAvatarClick={() => handleTabChange('perfil')} 
        foto={appState.fotoPerfil} 
      />
      
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Cargando...</div>}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onVerVisitas={() => handleTabChange('progreso')}
                onVerTodo={() => handleTabChange('entrenamiento')}
                onAvatarClick={() => handleTabChange('perfil')}
              />
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <Perfil 
                onBack={() => handleTabChange('inicio')} 
                foto={appState.fotoPerfil} 
                setFoto={(foto) => setAppState(prev => ({ ...prev, fotoPerfil: foto }))}
                memberID={appState.memberID} 
                setMemberID={(id) => setAppState(prev => ({ ...prev, memberID: id }))}
                onLogout={handleLogout} 
              />
            } 
          />
          <Route 
            path="/entrenamiento" 
            element={
              <Entrenamiento
                tempoConfig={appState.tempoConfig}
                setTempoConfig={(config) => setAppState(prev => ({ ...prev, tempoConfig: config }))}
                showTempo={appState.showTempo}
                setShowTempo={(show) => setAppState(prev => ({ ...prev, showTempo: show }))}
                onCrearRutina={() => navigate('/crearrutina')}
              />
            } 
          />
          <Route 
            path="/crearrutina" 
            element={
              <CrearRutina
                onBack={() => navigate('/entrenamiento')}
                rutinas={appState.rutinas}
                addRutina={(r) => setAppState(prev => ({ ...prev, rutinas: [...prev.rutinas, r] }))}
                token={token}
              />
            } 
          />
          <Route 
            path="/progreso" 
            element={
              <Progreso 
                onGotoEntrenamiento={() => handleTabChange('entrenamiento')} 
              />
            } 
          />
          <Route 
            path="/clubs" 
            element={<Clubs />} 
          />
          <Route 
            path="/temporizador" 
            element={<Temporizador />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      
      <BottomNav 
        tabActiva={getActiveTab()} 
        setTabActiva={handleTabChange} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider />
      <AppContent />
    </Router>
  );
}

export default App;