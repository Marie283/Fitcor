import React, { useState } from 'react';
import 'paginas/css/progreso-tabs.css';

const subTabs = ['Semana', 'Mes', 'Año'];
const mainTabs = ['Mis datos', 'Entrenamientos', 'Visitas', 'Insignias'];

function ProgresoEntrenamientos({ onVerEntrenamientos, activeTab = 'Entrenamientos', onTabChange }) {
  const [subTab, setSubTab] = useState('Semana');

  return (
    <div className="ptabs-container">
      {/* Tabs superiores */}
      <div className="ptabs-tabs">
        {mainTabs.map(tab => (
          <div
            key={tab}
            onClick={() => onTabChange && onTabChange(tab)}
            className={`ptabs-tab ${activeTab === tab ? 'ptabs-tab--activa' : ''}`}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Sub-tabs */}
      <div className="ptabs-subtabs">
        {subTabs.map(st => (
          <button
            key={st}
            onClick={() => setSubTab(st)}
            className={`ptabs-subtab ${subTab === st ? 'ptabs-subtab--activa' : ''}`}
          >
            {st}
          </button>
        ))}
      </div>
      {/* Mensaje sin entrenamientos */}
      <div className="entrenamientos-empty">
        <div className="entrenamientos-icon">
          <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#fff7e6" /><path d="M20 40a12 12 0 1 1 24 0" stroke="var(--brand-orange)" strokeWidth="3" fill="none" /><circle cx="32" cy="28" r="6" stroke="var(--brand-orange)" strokeWidth="3" fill="none" /></svg>
        </div>
        <div className="entrenamientos-title">Ningún entrenamiento durante este período</div>
        <div className="entrenamientos-text">¡Vamos juntos a por esos objetivos! Entrena ahora con la app de FITCOR.</div>
        <button
          onClick={onVerEntrenamientos}
          className="entrenamientos-btn"
        >
          VER ENTRENAMIENTOS
        </button>
        {/* Espaciador para scroll extra */}
        <div className="entrenamientos-spacer" />
      </div>
    </div>
  );
}

export default ProgresoEntrenamientos;
