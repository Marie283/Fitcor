import React, { useState, useEffect } from 'react';

const mainTabs = ['Mis datos', 'Entrenamientos', 'Visitas', 'Insignias'];

function calcularIMC(peso, altura) {
  if (!peso || !altura) return null;
  const alturaM = altura / 100;
  return Math.round((peso / (alturaM * alturaM)) * 10) / 10;
}

function ProgresoDatos({ activeTab = 'Mis datos', onTabChange }) {
  const [showIMCModal, setShowIMCModal] = useState(false);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setIMC] = useState(34);
  const [estadoFisico, setEstadoFisico] = useState('Normal');
  const [showCompoModal, setShowCompoModal] = useState(false);
  const [healthConnect, setHealthConnect] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('datosIMC') || '{}');
    if (datos.peso) setPeso(datos.peso);
    if (datos.altura) setAltura(datos.altura);
    if (datos.peso && datos.altura) setIMC(calcularIMC(Number(datos.peso), Number(datos.altura)));
  }, []);

  const handleGuardarIMC = () => {
    if (!peso || !altura) return;
    const nuevoIMC = calcularIMC(Number(peso), Number(altura));
    setIMC(nuevoIMC);
    localStorage.setItem('datosIMC', JSON.stringify({ peso, altura }));
    setShowIMCModal(false);
  };

  // Valores de ejemplo
  let masaGrasa = 43, masaMuscular = 54;
  if (estadoFisico === 'Delgado/a') {
    masaGrasa = 15; masaMuscular = 82;
  } else if (estadoFisico === 'Normal') {
    masaGrasa = 25; masaMuscular = 72;
  } else if (estadoFisico === 'Fuerte/Musculoso/a') {
    masaGrasa = 13; masaMuscular = 84;
  } else if (estadoFisico === 'Con sobrepeso') {
    masaGrasa = 43; masaMuscular = 54;
  }
  const masaOsea = 3;
  const total = masaGrasa + masaMuscular + masaOsea;
  const circ = 2 * Math.PI * 36; // Perímetro del círculo (r=36)
  // Cálculo de longitudes proporcionales
  const grasaLen = (masaGrasa / total) * circ;
  const musculoLen = (masaMuscular / total) * circ;
  const oseaLen = (masaOsea / total) * circ;

  // Logros con imagen individual y conseguido
  const logros = [
    { titulo: '2 semanas seguidas', fecha: '07/07/2025', img: require('../img/insignia1.png'), conseguido: true },
    { titulo: '15 visitas al club', fecha: '06/07/2025', img: require('../img/insignia2.png'), conseguido: true },
    { titulo: '4 visitas en 7 días', fecha: '05/05/2025', img: require('../img/insignia3.png'), conseguido: true },
    { titulo: '5 clases seguidas', fecha: '', img: require('../img/insignia4.png'), conseguido: false },
    { titulo: '125 visitas', fecha: '', img: require('../img/insignia5.png'), conseguido: false },
    { titulo: '10 visitas en 14 días', fecha: '', img: require('../img/insignia6.png'), conseguido: false },
    { titulo: '3 meses seguidos', fecha: '', img: require('../img/insignia7.png'), conseguido: false },
    { titulo: '2000 min al año', fecha: '', img: require('../img/insignia8.png'), conseguido: false },
    { titulo: '10 visitas en 14 días', fecha: '', img: require('../img/insignia9.png'), conseguido: false },
    { titulo: '30 clases', fecha: '', img: require('../img/insignia10.png'), conseguido: false },
    { titulo: 'Frecuencia imparable', fecha: '', img: require('../img/insignia11.png'), conseguido: false },
    { titulo: '3 clases seguidas', fecha: '', img: require('../img/insignia12.png'), conseguido: false },
  ];
  const numCols = 3;
  const numRows = 4;
  const [showLogrosModal, setShowLogrosModal] = useState(false);
  const numInsignias = 3; // Cambia este valor si tu sprite tiene más o menos insignias

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', padding: 0, fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif` }}>
      {/* Tabs superiores */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #eee', marginBottom: 8, position: 'relative' }}>
        {mainTabs.map((tab, idx) => (
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
      {/* INSIGNIAS: solo si la pestaña activa es 'Insignias' */}
      {activeTab === 'Insignias' && (
        <div>
          {/* Próximo objetivo */}
          <div style={{ background: '#f6f6f6', borderRadius: 16, marginBottom: 18, padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 64, height: 64, backgroundImage: `url(${require('../img/imagenesinsignias.png')})`, backgroundSize: `${numCols * 100}% ${numRows * 100}%`, backgroundPosition: `${(0 * 100) / (numCols - 1)}% ${(0 * 100) / (numRows - 1)}%`, borderRadius: 14, backgroundRepeat: 'no-repeat', boxShadow: '0 2px 8px rgba(255,145,0,0.10)' }} />
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
              {/* Ejemplo de rachas, puedes ajustar col/fila y conseguido según tus datos */}
              {[
                { titulo: '2 semanas seguidas', fecha: '07/07/2025', col: 0, fila: 0, conseguido: true },
                { titulo: '3 semanas seguidas', fecha: '30/04/2025', col: 1, fila: 0, conseguido: true },
                { titulo: '4 semanas seguidas', fecha: '05/05/2025', col: 2, fila: 0, conseguido: true },
                { titulo: '10 semanas seguidas', fecha: '', col: 0, fila: 1, conseguido: false },
                { titulo: '15 semanas seguidas', fecha: '', col: 1, fila: 1, conseguido: false },
                { titulo: '20 semanas seguidas', fecha: '', col: 2, fila: 1, conseguido: false },
              ].map((racha, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 54, height: 54, backgroundImage: `url(${require('../img/imagenesinsignias.png')})`, backgroundSize: `${numCols * 100}% ${numRows * 100}%`, backgroundPosition: `${(racha.col * 100) / (numCols - 1)}% ${(racha.fila * 100) / (numRows - 1)}%`, borderRadius: 12, backgroundRepeat: 'no-repeat', boxShadow: '0 2px 8px rgba(255,145,0,0.10)', filter: racha.conseguido ? 'none' : 'grayscale(1) brightness(1.2)', border: racha.conseguido ? '2.5px solid #ff9100' : '2.5px solid #eee', marginBottom: 4 }} />
                  <div style={{ fontWeight: 900, fontSize: 13, color: racha.conseguido ? '#222' : '#bbb', textAlign: 'center', lineHeight: 1.1 }}>{racha.titulo}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{racha.conseguido && racha.fecha}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Últimos logros */}
      <div style={{ background: '#f6f6f6', borderRadius: 16, marginBottom: 18, padding: '0 0 18px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 18px 0 18px' }}>
          <span style={{ fontWeight: 900, fontSize: 17, color: '#222' }}>ÚLTIMOS LOGROS</span>
          <span style={{ color: '#ff9100', fontWeight: 900, fontSize: 15, cursor: 'pointer' }} onClick={() => setShowLogrosModal(true)}>Ver todo</span>
        </div>
        <div style={{ display: 'flex', gap: 12, padding: '18px 18px 0 18px', overflowX: 'auto', minHeight: 110 }}>
          {logros.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', color: '#bbb', fontWeight: 700, fontSize: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 90 }}>
              <span style={{ fontSize: 38, marginBottom: 6 }}>🚀</span>
              ¡Aún no tienes logros!<br/>¡Sigue entrenando y los conseguirás!
            </div>
          ) : (
            logros.map((logro, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  minWidth: 90,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 10,
                  transition: 'transform 0.18s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-7px) scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                onTouchStart={e => e.currentTarget.style.transform = 'translateY(-7px) scale(1.08)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'none'}
              >
                <img
                  src={logro.img}
                  alt={logro.titulo}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'contain',
                    marginBottom: 6,
                    transition: 'box-shadow 0.18s',
                    boxShadow: '0 2px 8px rgba(255,145,0,0.10)',
                    background: '#fff',
                    borderRadius: 8,
                    filter: logro.conseguido ? 'none' : 'grayscale(1) brightness(1.2)'
                  }}
                />
                <div style={{ fontWeight: 900, fontSize: 13, color: '#222', textAlign: 'center', lineHeight: 1.1 }}>{logro.titulo}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{logro.fecha}</div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Modal de logros completos */}
      {showLogrosModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, minWidth: 340, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', maxWidth: 500 }}>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#ff9100', marginBottom: 8 }}>Todas las insignias</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 1fr)`, gap: 18, marginBottom: 8 }}>
              {logros.map((logro, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 70 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      backgroundImage: `url(${require('../img/imagenesinsignias.png')})`,
                      backgroundSize: `${numCols * 100}% ${numRows * 100}%`,
                      backgroundPosition: `${(logro.col * 100) / (numCols - 1)}% ${(logro.fila * 100) / (numRows - 1)}%`,
                      borderRadius: 12,
                      marginBottom: 6,
                      boxShadow: '0 2px 8px rgba(255,145,0,0.10)',
                      backgroundRepeat: 'no-repeat',
                      filter: logro.conseguido ? 'none' : 'grayscale(1) brightness(1.2)',
                      border: logro.conseguido ? '2.5px solid #ff9100' : '2.5px solid #eee',
                      transition: 'filter 0.2s, border 0.2s',
                    }}
                  />
                  <div style={{ fontWeight: 900, fontSize: 13, color: logro.conseguido ? '#222' : '#bbb', textAlign: 'center', lineHeight: 1.1 }}>{logro.titulo}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{logro.conseguido && logro.fecha}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowLogrosModal(false)} style={{ background: '#ff9100', color: '#fff', fontWeight: 900, fontSize: 17, border: 'none', borderRadius: 10, padding: '10px 0', width: '100%', marginTop: 8, cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}
      {/* Tarjetas Peso, Calorías, Pasos */}
      <div style={{ background: '#fff', borderRadius: 16, marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '0 0 0 0' }}>
        {/* Peso */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 18px 0 18px' }}>
          <div>
            <div style={{ color: '#888', fontWeight: 700, fontSize: 15 }}>Peso</div>
            <div style={{ fontWeight: 900, fontSize: 32, color: '#222', lineHeight: 1 }}>{peso || '0'}<span style={{ fontWeight: 400, fontSize: 18, color: '#888' }}>&nbsp;Kg</span></div>
          </div>
          <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900, cursor: 'pointer' }}>→</span>
        </div>
        {/* Gráfico peso */}
        <div style={{ padding: '0 18px 12px 18px' }}>
          <svg width="100%" height="32" viewBox="0 0 120 32">
            <polyline fill="none" stroke="#ff9100" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points="5,25 20,18 35,20 50,15 65,17 80,14 95,16 110,13" />
            <circle cx="110" cy="13" r="3" fill="#ff9100" />
          </svg>
        </div>
        {/* Calorías */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div>
            <div style={{ color: '#888', fontWeight: 700, fontSize: 15 }}>Calorías quemadas</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#222', lineHeight: 1 }}>0<span style={{ fontWeight: 400, fontSize: 16, color: '#888' }}>&nbsp;Kcal</span></div>
          </div>
          <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900, cursor: 'pointer' }}>→</span>
        </div>
        <div style={{ padding: '0 18px 12px 18px' }}>
          <svg width="100%" height="32" viewBox="0 0 120 32">
            {[8, 12, 10, 14, 9, 13, 11].map((h, i) => (
              <rect key={i} x={5 + i * 16} y={32 - h * 2} width="10" height={h * 2} rx="4" fill="#4de3d1" />
            ))}
          </svg>
        </div>
        {/* Pasos */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
          <div>
            <div style={{ color: '#888', fontWeight: 700, fontSize: 15 }}>Pasos</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#222', lineHeight: 1 }}>{healthConnect ? '0' : '0'}<span style={{ fontWeight: 400, fontSize: 16, color: '#888' }}>&nbsp;Pasos dados</span></div>
          </div>
          <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900, cursor: 'pointer' }}>→</span>
        </div>
        <div style={{ padding: '0 18px 18px 18px' }}>
          <svg width="100%" height="32" viewBox="0 0 120 32">
            {[8, 12, 10, 14, 9, 13, 11].map((h, i) => (
              <rect key={i} x={5 + i * 16} y={32 - h * 2} width="10" height={h * 2} rx="4" fill="#4de3d1" />
            ))}
          </svg>
        </div>
      </div>
      {/* Composición corporal */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '18px 18px 10px 18px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontWeight: 700, color: '#888', fontSize: 15 }}>COMPOSICIÓN CORPORAL</div>
          <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900, cursor: 'pointer' }} onClick={() => setShowCompoModal(true)}>→</span>
        </div>
        <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>Última medición: 27/05/2025</div>
        {imc && (
          <div style={{ color: '#ff9100', fontWeight: 900, fontSize: 15, marginBottom: 8 }}>
            IMC actual: {imc}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff9100', display: 'inline-block', marginRight: 6 }}></span>
              <span style={{ fontSize: 15, color: '#222', fontWeight: 700 }}>Masa grasa</span>
              <span style={{ marginLeft: 8, color: '#222', fontWeight: 700 }}>{masaGrasa}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: '#4de37a', display: 'inline-block', marginRight: 6 }}></span>
              <span style={{ fontSize: 15, color: '#222', fontWeight: 700 }}>Masa muscular</span>
              <span style={{ marginLeft: 8, color: '#222', fontWeight: 700 }}>{masaMuscular}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: '#222', display: 'inline-block', marginRight: 6 }}></span>
              <span style={{ fontSize: 15, color: '#222', fontWeight: 700 }}>Masa ósea</span>
              <span style={{ marginLeft: 8, color: '#222', fontWeight: 700 }}>{masaOsea}%</span>
            </div>
          </div>
          <svg width="90" height="90" viewBox="0 0 90 90" style={{ background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <circle cx="45" cy="45" r="36" stroke="#eee" strokeWidth="14" fill="none" />
            {/* Masa grasa */}
            <circle cx="45" cy="45" r="36" stroke="#ff9100" strokeWidth="14" fill="none" strokeDasharray={`${grasaLen} ${circ - grasaLen}`} strokeDashoffset="0" style={{ strokeLinecap: 'butt', transition: 'stroke-dasharray 0.7s' }} transform="rotate(-90 45 45)" />
            {/* Masa muscular */}
            <circle cx="45" cy="45" r="36" stroke="#4de37a" strokeWidth="14" fill="none" strokeDasharray={`${musculoLen} ${circ - musculoLen}`} strokeDashoffset={`-${grasaLen}`} style={{ strokeLinecap: 'butt', transition: 'stroke-dasharray 0.7s' }} transform="rotate(-90 45 45)" />
            {/* Masa ósea */}
            <circle cx="45" cy="45" r="36" stroke="#222" strokeWidth="14" fill="none" strokeDasharray={`${oseaLen} ${circ - oseaLen}`} strokeDashoffset={`-${grasaLen + musculoLen}`} style={{ strokeLinecap: 'butt', transition: 'stroke-dasharray 0.7s' }} transform="rotate(-90 45 45)" />
          </svg>
        </div>
      </div>
      {/* Modal para composición corporal */}
      {showCompoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, minWidth: 280, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, color: '#ff9100' }}>Selecciona tu estado físico</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Delgado/a', 'Normal', 'Fuerte/Musculoso/a', 'Con sobrepeso'].map(op => (
                <button
                  key={op}
                  onClick={() => setEstadoFisico(op)}
                  style={{
                    background: estadoFisico === op ? '#ff9100' : '#fff',
                    color: estadoFisico === op ? '#fff' : '#ff9100',
                    border: '2px solid #ff9100',
                    borderRadius: 16,
                    padding: '8px 18px',
                    fontWeight: 900,
                    fontSize: 15,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: estadoFisico === op ? '0 2px 8px rgba(255,145,0,0.10)' : 'none',
                    marginBottom: 4
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
            <button onClick={() => setShowCompoModal(false)} style={{ background: '#ff9100', color: '#fff', fontWeight: 900, fontSize: 17, border: 'none', borderRadius: 10, padding: '10px 0', width: '100%', marginTop: 8, cursor: 'pointer' }}>Guardar</button>
            <button onClick={() => setShowCompoModal(false)} style={{ background: '#eee', color: '#222', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 10, padding: '8px 0', width: '100%', marginTop: 0, cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}
      {/* IMC */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '18px 18px 10px 18px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontWeight: 700, color: '#888', fontSize: 15 }}>MI IMC</div>
          <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900, cursor: 'pointer' }} onClick={() => setShowIMCModal(true)}>→</span>
        </div>
        <div style={{ fontWeight: 900, fontSize: 32, color: '#222', marginBottom: 2 }}>{imc}</div>
        <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Basado en tu peso y estatura</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1, height: 6, background: '#eee', borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', left: `${imc <= 18.5 ? 0 : imc <= 24.9 ? 25 : imc <= 29.9 ? 50 : 75}%`, top: -6, width: 18, height: 18, background: '#ff9100', borderRadius: 9, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(255,145,0,0.10)', transition: 'left 0.3s' }}></div>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '25%', height: 6, background: '#4de3d1', borderRadius: 4 }}></div>
            <div style={{ position: 'absolute', left: '25%', top: 0, width: '25%', height: 6, background: '#4de37a', borderRadius: 4 }}></div>
            <div style={{ position: 'absolute', left: '50%', top: 0, width: '25%', height: 6, background: '#ffd700', borderRadius: 4 }}></div>
            <div style={{ position: 'absolute', left: '75%', top: 0, width: '25%', height: 6, background: '#ff9100', borderRadius: 4 }}></div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginTop: 4 }}>
          <span>Peso bajo</span>
          <span>Saludable</span>
          <span>Sobrepeso</span>
          <span style={{ color: '#ff9100', fontWeight: 700 }}>Obesidad</span>
        </div>
      </div>
      {/* Modal para calcular IMC */}
      {showIMCModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, minWidth: 280, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, color: '#ff9100' }}>Calcular IMC</div>
            <label style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>
              Peso (kg):
              <input type="number" value={peso} onChange={e => setPeso(e.target.value)} style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 8, border: '1.5px solid #eee', fontSize: 16, marginBottom: 12 }} />
            </label>
            <label style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>
              Altura (cm):
              <input type="number" value={altura} onChange={e => setAltura(e.target.value)} style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 8, border: '1.5px solid #eee', fontSize: 16, marginBottom: 12 }} />
            </label>
            <button onClick={handleGuardarIMC} style={{ background: '#ff9100', color: '#fff', fontWeight: 900, fontSize: 17, border: 'none', borderRadius: 10, padding: '10px 0', marginTop: 8, cursor: 'pointer' }}>Guardar</button>
            <button onClick={() => setShowIMCModal(false)} style={{ background: '#eee', color: '#222', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 10, padding: '8px 0', marginTop: 0, cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}
      {/* Health Connect */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '18px 18px 10px 18px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24, color: '#ff9100' }}>❤️</span>
          <span style={{ fontWeight: 900, fontSize: 17 }}>Health Connect</span>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input type="checkbox" checked={healthConnect} onChange={e => { setHealthConnect(e.target.checked); if (e.target.checked) setShowHealthModal(true); }} style={{ display: 'none' }} />
          <span style={{ width: 38, height: 22, background: healthConnect ? '#ff9100' : '#eee', borderRadius: 12, position: 'relative', display: 'inline-block', marginLeft: 8, transition: 'background 0.2s' }}>
            <span style={{ position: 'absolute', left: healthConnect ? 18 : 2, top: 2, width: 18, height: 18, background: '#fff', borderRadius: 9, boxShadow: '0 1px 4px rgba(0,0,0,0.10)', border: '1.5px solid #ddd', transition: 'left 0.2s' }}></span>
          </span>
        </label>
      </div>
      {/* Espaciador para scroll extra */}
      <div style={{ height: 120 }} />
      {/* Modal Health Connect */}
      {showHealthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, minWidth: 300, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
            <span style={{ fontSize: 40, color: '#ff9100' }}>📱</span>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#ff9100', textAlign: 'center' }}>Próximamente: Conexión con Google Fit</div>
            <div style={{ color: '#444', fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
              Podrás ver tus pasos reales y otros datos de salud conectando tu cuenta de Google Fit desde la app móvil.<br/><br/>
              ¡Muy pronto disponible en FITCOR!
            </div>
            <button onClick={() => setShowHealthModal(false)} style={{ background: '#ff9100', color: '#fff', fontWeight: 900, fontSize: 17, border: 'none', borderRadius: 10, padding: '10px 0', width: '100%', marginTop: 8, cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgresoDatos; 