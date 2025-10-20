import React, { useState } from 'react';

const mainTabs = ['Mis datos', 'Entrenamientos', 'Visitas', 'Insignias'];
const numCols = 4;
const numRows = 3;

const rachas = [
  // Fila 1
  { titulo: '2 semanas seguidas', fecha: '07/07/2025', img: require('../img/insignia1.png'), conseguido: true },
  { titulo: '15 visitas al club', fecha: '30/04/2025', img: require('../img/insignia2.png'), conseguido: true },
  { titulo: '4 visitas en 7 días', fecha: '05/05/2025', img: require('../img/insignia3.png'), conseguido: true },
  { titulo: '5 clases seguidas', fecha: '', img: require('../img/insignia4.png'), conseguido: false },
  // Fila 2
  { titulo: '125 visitas', fecha: '', img: require('../img/insignia5.png'), conseguido: false },
  { titulo: '10 visitas en 14 días', fecha: '', img: require('../img/insignia6.png'), conseguido: false },
  { titulo: '3 meses seguidos', fecha: '', img: require('../img/insignia7.png'), conseguido: false },
  { titulo: '2000 min al año', fecha: '', img: require('../img/insignia8.png'), conseguido: false },
  // Fila 3
  { titulo: '10 visitas en 14 días', fecha: '', img: require('../img/insignia9.png'), conseguido: false },
  { titulo: '30 clases', fecha: '', img: require('../img/insignia10.png'), conseguido: false },
  { titulo: 'Frecuencia imparable', fecha: '', img: require('../img/insignia11.png'), conseguido: false },
  { titulo: '3 clases seguidas', fecha: '', img: require('../img/insignia12.png'), conseguido: false },
];

function ProgresoInsignias({ activeTab = 'Insignias', onTabChange }) {
  const [insigniaModal, setInsigniaModal] = useState(null);

  const anchoInsignia = 288; // Ancho real de cada insignia en px
  const altoInsignia = 256;  // Alto real de cada insignia en px

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
      {/* Próximo objetivo */}
      <div style={{ background: '#f6f6f6', borderRadius: 16, marginBottom: 18, padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={require('../img/insignia11.png')} alt="Insignia 11" style={{ width: 64, height: 64, borderRadius: 14, background: '#fff', boxShadow: '0 2px 8px rgba(255,145,0,0.10)', objectFit: 'contain' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#888', marginBottom: 2 }}>TU PRÓXIMO OBJETIVO</div>
            <div style={{ height: 4, background: '#ff9100', borderRadius: 2, width: 120, margin: '6px 0 10px 0' }} />
            <div style={{ fontWeight: 900, fontSize: 18, color: '#222', marginBottom: 4 }}>3 semanas seguidas</div>
            <div style={{ color: '#444', fontSize: 14, lineHeight: 1.3 }}>¡Llevas 2 semanas seguidas!<br/>Sigue yendo al gym para mantener esta buena racha.</div>
          </div>
        </div>
      </div>
      {/* Rachas */}
      <div style={{ background: '#fff', borderRadius: 16, marginBottom: 18, padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontWeight: 900, fontSize: 15, color: '#888', marginBottom: 8 }}>RACHAS</div>
        <div style={{ color: '#444', fontSize: 14, marginBottom: 14 }}>Visita el gimnasio al menos una vez por semana.<br/>¡Escanea tu código QR o tarjeta del club para registrar tu visita!</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {rachas.map((racha, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={racha.img}
                alt={racha.titulo}
                style={{
                  width: 54,
                  height: 54,
                  objectFit: 'contain',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(255,145,0,0.10)',
                  filter: racha.conseguido ? 'none' : 'grayscale(1) brightness(1.2)',
                  border: racha.conseguido ? '2.5px solid #ff9100' : '2.5px solid #eee',
                  marginBottom: 4,
                  cursor: 'pointer',
                  background: '#fff'
                }}
                onClick={() => setInsigniaModal(racha)}
              />
              <div style={{ fontWeight: 900, fontSize: 13, color: racha.conseguido ? '#222' : '#bbb', textAlign: 'center', lineHeight: 1.1 }}>{racha.titulo}</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{racha.conseguido && racha.fecha}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal insignia grande */}
      {insigniaModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 240, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <img
              src={insigniaModal.img}
              alt={insigniaModal.titulo}
              style={{
                width: 150,
                height: 150,
                objectFit: 'contain',
                borderRadius: 32,
                boxShadow: '0 4px 16px rgba(255,145,0,0.13)',
                filter: insigniaModal.conseguido ? 'none' : 'grayscale(1) brightness(1.2)',
                border: insigniaModal.conseguido ? '5px solid #ff9100' : '5px solid #eee',
                background: '#fff'
              }}
            />
            <div style={{ fontWeight: 900, fontSize: 22, color: insigniaModal.conseguido ? '#222' : '#bbb', textAlign: 'center', lineHeight: 1.1 }}>{insigniaModal.titulo}</div>
            {insigniaModal.conseguido && <div style={{ fontSize: 16, color: '#888', marginTop: 2 }}>{insigniaModal.fecha}</div>}
            <button onClick={() => setInsigniaModal(null)} style={{ background: '#ff9100', color: '#fff', fontWeight: 900, fontSize: 17, border: 'none', borderRadius: 10, padding: '12px 0', width: 140, marginTop: 8, cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}
      {/* Espaciador para scroll extra */}
      <div style={{ height: 120 }} />
    </div>
  );
}

export default ProgresoInsignias; 