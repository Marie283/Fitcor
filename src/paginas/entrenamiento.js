import React from 'react';
import Temporizador from './temporizador';

const cards = [
  {
    title: 'ENTRENAMIENTOS EN CASA',
    desc: 'Ponte en forma en casa con entrenamientos fáciles.',
    color: '#a084e8',
    img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
  {
    title: 'ENTRENAMIENTOS EN EL GIMNASIO',
    desc: 'Cientos de entrenamientos de fuerza, cardio y cuerpo completo para todos los niveles.',
    color: '#ff9100',
    img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
  {
    title: 'PROGRAMAS',
    desc: 'Selección de entrenamientos de varias semanas para todos, donde sea que estés.',
    color: '#222',
    img: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
  {
    title: 'BIENESTAR',
    desc: 'Meditaciones, nutrición e inspiración para sentirte bien y feliz.',
    color: '#bba48a',
    img: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
];

function Entrenamiento({ tempoConfig, setTempoConfig, showTempo, setShowTempo, onCrearRutina }) {
  if (showTempo) {
    return <Temporizador config={tempoConfig} setConfig={setTempoConfig} onBack={() => setShowTempo(false)} />;
  }

  return (
    <div className="entrenamiento-responsive" style={{ maxWidth: '100vw', margin: '0 auto', padding: '16px 0', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 4px' }}>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 2rem)', marginBottom: 18, letterSpacing: '-1px' }}>¿CUÁL ES TU ACTITUD PARA ENTRENAR?</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap' }}>
          <button
            style={{ flex: 1, background: '#fff', border: '2px solid #eee', borderRadius: 16, padding: '16px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            onClick={onCrearRutina}
          >
            <span role="img" aria-label="rutina" style={{ marginRight: 8 }}>🏋️‍♂️</span> CREA TU RUTINA
          </button>
          <button
            style={{ flex: 1, background: '#fff', border: '2px solid #eee', borderRadius: 16, padding: '16px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            onClick={() => setShowTempo(true)}
          >
            <span role="img" aria-label="intervalos" style={{ marginRight: 8 }}>⏱️</span> TEMPO. DE INTERVALOS
          </button>
        </div>
        {cards.map((card, i) => (
          <div key={i} style={{
            borderRadius: 18,
            overflow: 'hidden',
            marginBottom: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            background: card.color,
            color: '#fff',
            position: 'relative',
          }}>
            <div style={{
              background: `linear-gradient(90deg, ${card.color} 70%, rgba(255,255,255,0.1) 100%)`,
              minHeight: 90,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 0,
              position: 'relative',
            }}>
              <img src={card.img} alt={card.title} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45,
                zIndex: 0,
              }} />
              <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '18px 16px 12px 16px' }}>
                <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4, letterSpacing: '-0.5px', textShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>{card.title}</div>
                <div style={{ fontWeight: 500, fontSize: 14, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>{card.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Entrenamiento; 