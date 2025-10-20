import React, { useState } from 'react';
import gimnasioImg from '../img/gimnasio.jpg';

const visitasEjemplo = [
  {
    club: 'FITCOR A CORUÑA AVENIDA DE CASTELO',
    fecha: '2025-07-07',
    hora: 'e9:26:32',
    img: gimnasioImg
  },
  {
    club: 'FITCOR SEGOVIA AVENIDA DEL OBISPO QUESADA',
    fecha: '2025-07-06',
    hora: '20:09:23',
    img: gimnasioImg
  },
  {
    club: 'FITCOR BURGOS CALLE SERRAMAGNA',
    fecha: '2025-05-27',
    hora: '17:23:16',
    img: gimnasioImg
  },
  {
    club: 'FITCOR MADRID CALLE ESCOBAR',
    fecha: '2025-04-27',
    hora: '18:23:10',
    img: gimnasioImg
  },
  {
    club: 'FITCOR MADRID CALLE ESCOBAR',
    fecha: '2025-04-26',
    hora: '15:03:10',
    img: gimnasioImg
  },
  {
    club: 'FITCOR SEGOVIA AVENIDA DEL OBISPO QUESADA',
    fecha: '2025-03-26',
    hora: '20:09:23',
    img: gimnasioImg
  },
  {
    club: 'FITCOR BURGOS CALLE DE LA PLAZA',
    fecha: '2025-03-24',
    hora: '18:19:23',
    img: gimnasioImg
  }
].map(v => ({...v, club: v.club.replace(/^GYM-FIT/, 'FITCOR')}));

const subTabs = ['Semana', 'Mes', 'Año'];

function ProgresoVisitas({ onTabChange, activeTab = 'Visitas' }) {
  const [subTab, setSubTab] = useState('Año');

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', padding: 0, fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif` }}>
      {/* Tabs superiores */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #eee', marginBottom: 8 }}>
        {['Mis datos', 'Entrenamientos', 'Visitas', 'Insignias'].map(tab => (
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
      {/* Estadísticas */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1, background: '#f6f7fb', borderRadius: 14, padding: '18px 0', textAlign: 'center', fontWeight: 700, fontSize: 16 }}>
          <div style={{ fontSize: 28, color: '#ff9100', marginBottom: 2 }}>56</div>
          <div style={{ color: '#888', fontSize: 14 }}>ESTE AÑO</div>
        </div>
        <div style={{ flex: 1, background: '#f6f7fb', borderRadius: 14, padding: '18px 0', textAlign: 'center', fontWeight: 700, fontSize: 16 }}>
          <div style={{ fontSize: 28, color: '#ff9100', marginBottom: 2 }}>56</div>
          <div style={{ color: '#888', fontSize: 14 }}>TOTAL</div>
        </div>
      </div>
      {/* Historial */}
      <div style={{ fontWeight: 900, fontSize: 16, background: '#222', color: '#fff', borderRadius: 10, padding: '10px 14px', marginBottom: 10 }}>Tu historial</div>
      <div>
        {visitasEjemplo.map((v, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <img src={v.img} alt={v.club} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', margin: 8 }} />
            <div style={{ flex: 1, padding: '0 8px' }}>
              <div style={{ fontWeight: 900, fontSize: 15 }}>{v.club}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{v.fecha} - {v.hora}</div>
            </div>
          </div>
        ))}
        {/* Espaciador para scroll extra */}
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}

export default ProgresoVisitas; 