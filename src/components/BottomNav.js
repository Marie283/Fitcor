import React from 'react';
import './BottomNav.css';

const tabs = [
  { id: 'inicio', icon: '🏠', label: 'Inicio' },
  { id: 'entrenamiento', icon: '💪', label: 'Entrenamiento' },
  { id: 'progreso', icon: '📈', label: 'Progreso' },
  { id: 'clubs', icon: '📍', label: 'Clubs' },
];

function BottomNav({ tabActiva, setTabActiva }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn${tabActiva === tab.id ? ' active' : ''}`}
          onClick={() => setTabActiva(tab.id)}
        >
          <span className="nav-icon-bg">
            <span className="nav-icon">{tab.icon}</span>
          </span>
          <div>{tab.label}</div>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav; 