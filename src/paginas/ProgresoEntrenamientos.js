import React, { useState } from 'react';

const subTabs = ['Semana', 'Mes', 'Año'];
const mainTabs = ['Mis datos', 'Entrenamientos', 'Visitas', 'Insignias'];

function ProgresoEntrenamientos({ onVerEntrenamientos, activeTab = 'Entrenamientos', onTabChange }) {
  const [subTab, setSubTab] = useState('Semana');

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', padding: 0, fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif` }}>
      {/* Tabs superiores */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #eee', marginBottom: 8 }}>
        {mainTabs.map(tab => (
          <div
            key={tab}
            onClick={() => onTabChange && onTabChange(tab)}
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 900,
              fontSize: 16,
              color: activeTab === tab ? '#ff9100' : '#222',
              cursor: 'pointer',
              padding: '12px 0 8px 0',
              borderBottom: activeTab === tab ? '4px solid #ff9100' : '4px solid transparent',
              transition: 'all 0.2s',
              letterSpacing: 0.2
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Sub-tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 18px 0', gap: 8 }}>
        {subTabs.map(st => (
          <button
            key={st}
            onClick={() => setSubTab(st)}
            style={{
              background: subTab === st ? '#ff9100' : '#f6f7fb',
              color: subTab === st ? '#fff' : '#222',
              border: 'none',
              borderRadius: 18,
              padding: '7px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: subTab === st ? '0 2px 8px rgba(255,145,0,0.10)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {st}
          </button>
        ))}
      </div>
      {/* Mensaje sin entrenamientos */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <div style={{ fontSize: 64, color: '#ff9100', marginBottom: 12 }}>
          <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#fff7e6" /><path d="M20 40a12 12 0 1 1 24 0" stroke="#ff9100" strokeWidth="3" fill="none" /><circle cx="32" cy="28" r="6" stroke="#ff9100" strokeWidth="3" fill="none" /></svg>
        </div>
        <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>Ningún entrenamiento durante este período</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 22 }}>¡Vamos juntos a por esos objetivos! Entrena ahora con la app de FITCOR.</div>
        <button
          onClick={onVerEntrenamientos}
          style={{ width: '100%', background: '#8e44ad', color: '#fff', border: 'none', borderRadius: 16, padding: '14px 0', fontWeight: 900, fontSize: 17, letterSpacing: 1, cursor: 'pointer', marginTop: 8 }}
        >
          VER ENTRENAMIENTOS
        </button>
        {/* Espaciador para scroll extra */}
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}

export default ProgresoEntrenamientos; 