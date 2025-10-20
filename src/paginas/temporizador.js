import React, { useState, useRef, useEffect } from 'react';

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function CircularProgress({ percent, color = '#ff9100', size = 220, stroke = 14 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#444"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s linear' }}
      />
    </svg>
  );
}

function Temporizador({ config, setConfig, onBack }) {
  const [editKey, setEditKey] = useState(null);
  const [editValue, setEditValue] = useState(0);
  const [running, setRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [fase, setFase] = useState('esfuerzo'); // 'esfuerzo' | 'descanso' | 'reposo' | 'fin'
  const [segundos, setSegundos] = useState(config.esfuerzo);
  const [ejercicio, setEjercicio] = useState(1);
  const [ronda, setRonda] = useState(1);
  const timerRef = useRef();

  useEffect(() => {
    if (!showTimer) return;
    if (!running) return;
    if (fase === 'fin') return;
    timerRef.current = setTimeout(() => {
      if (segundos > 1) {
        setSegundos(segundos - 1);
      } else {
        handleNext();
      }
    }, 1000);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, [showTimer, running, segundos, fase]);

  const handleNext = () => {
    if (fase === 'esfuerzo') {
      if (ejercicio < config.ejercicios) {
        setFase('descanso');
        setSegundos(config.descanso);
      } else {
        if (ronda < config.rondas) {
          setFase('reposo');
          setSegundos(config.reposo);
        } else {
          setFase('fin');
        }
      }
    } else if (fase === 'descanso') {
      setFase('esfuerzo');
      setEjercicio(ejercicio + 1);
      setSegundos(config.esfuerzo);
    } else if (fase === 'reposo') {
      setFase('esfuerzo');
      setEjercicio(1);
      setRonda(ronda + 1);
      setSegundos(config.esfuerzo);
    }
  };

  const handleStart = () => {
    setShowTimer(true);
    setRunning(true);
    setFase('esfuerzo');
    setSegundos(config.esfuerzo);
    setEjercicio(1);
    setRonda(1);
  };

  const handlePause = () => setRunning(false);
  const handleResume = () => setRunning(true);
  const handleSalir = () => {
    setShowTimer(false);
    setRunning(false);
  };

  // --- Pantalla de temporizador funcional ---
  if (showTimer) {
    if (fase === 'fin') {
      return (
        <div style={{ background: '#111', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
          <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>¡Entrenamiento finalizado!</div>
          <button onClick={handleSalir} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 14, padding: '16px 40px', fontWeight: 900, fontSize: 18, marginTop: 18, letterSpacing: 1, cursor: 'pointer' }}>Salir</button>
        </div>
      );
    }
    const totalFase = fase === 'esfuerzo' ? config.esfuerzo : fase === 'descanso' ? config.descanso : config.reposo;
    const percent = segundos / totalFase;
    return (
      <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '0 0 24px 0', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 18px 0 18px' }}>
            <button onClick={handleSalir} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 26, fontWeight: 700, cursor: 'pointer' }}>×</button>
            <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.5px' }}>{`0:${pad(segundos)}`}</span>
            <span style={{ fontSize: 22, color: '#fff', opacity: 0.5 }}>▢</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0 0 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 28 }}>{ejercicio}/{config.ejercicios}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#aaa', letterSpacing: 1 }}>EJERCICIOS</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 28 }}>{ronda}/{config.rondas}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#aaa', letterSpacing: 1 }}>RONDAS</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0 0 0' }}>
            <div style={{ position: 'relative', width: 220, height: 220 }}>
              <CircularProgress percent={percent} color={fase === 'esfuerzo' ? '#ff9100' : '#4ed6c4'} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 22, color: fase === 'esfuerzo' ? '#ff9100' : '#4ed6c4', marginBottom: 6 }}>{fase.toUpperCase()}</div>
                <div style={{ fontWeight: 900, fontSize: 54, letterSpacing: '-2px', lineHeight: 1 }}>{`00:${pad(segundos)}`}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, marginTop: 36 }}>
            {running ? (
              <button onClick={handlePause} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 44, cursor: 'pointer' }}>❚❚</button>
            ) : (
              <button onClick={handleResume} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 44, cursor: 'pointer' }}>▶️</button>
            )}
            <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 38, cursor: 'pointer' }}>⏭️</button>
          </div>
        </div>
      </div>
    );
  }

  // --- Pantalla de configuración (por defecto) ---
  const totalTime = () => {
    // Tiempo total estimado (simple)
    const { esfuerzo, descanso, ejercicios, rondas, reposo } = config;
    const tiempo = ((esfuerzo + descanso) * ejercicios * rondas + reposo * (rondas - 1));
    const min = Math.floor(tiempo / 60);
    const sec = tiempo % 60;
    return `${pad(min)}:${pad(sec)}`;
  };

  const handleEdit = (key, value) => {
    setEditKey(key);
    setEditValue(value);
  };

  const handleSave = () => {
    setConfig({ ...config, [editKey]: Number(editValue) });
    setEditKey(null);
  };

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
      <div style={{ maxWidth: 400, margin: '0 auto', padding: '0 0 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '18px 18px 0 18px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 26, fontWeight: 700, cursor: 'pointer', marginRight: 8 }}>&larr;</button>
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.5px' }}>TEMPORIZADOR DE INTERVALOS</span>
        </div>
        <div style={{ textAlign: 'center', margin: '32px 0 8px 0' }}>
          <div style={{ fontWeight: 900, fontSize: 54, letterSpacing: '-2px', lineHeight: 1 }}>{totalTime()}</div>
          <div style={{ color: '#ff9100', fontWeight: 700, fontSize: 15, marginTop: 2 }}>TIEMPO PREVISTO</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', margin: '32px 0 24px 0' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#ff9100', fontSize: 22 }}>▶️</span>
              <span style={{ fontWeight: 700 }}>ESFUERZO</span>
            </div>
            <div style={{ color: '#ff9100', fontWeight: 700, fontSize: 20 }}>{`00:${pad(config.esfuerzo)}`}</div>
            <button style={editBtnStyle} onClick={() => handleEdit('esfuerzo', config.esfuerzo)}>✏️</button>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#4ed6c4', fontSize: 22 }}>⏳</span>
              <span style={{ fontWeight: 700 }}>DESCANSO</span>
            </div>
            <div style={{ color: '#4ed6c4', fontWeight: 700, fontSize: 20 }}>{`00:${pad(config.descanso)}`}</div>
            <button style={editBtnStyle} onClick={() => handleEdit('descanso', config.descanso)}>✏️</button>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#fff', fontSize: 22 }}>🏋️‍♂️</span>
              <span style={{ fontWeight: 700 }}>EJERCICIOS</span>
            </div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>{config.ejercicios}</div>
            <button style={editBtnStyle} onClick={() => handleEdit('ejercicios', config.ejercicios)}>✏️</button>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#fff', fontSize: 22 }}>🔁</span>
              <span style={{ fontWeight: 700 }}>RONDAS</span>
            </div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>{config.rondas}</div>
            <button style={editBtnStyle} onClick={() => handleEdit('rondas', config.rondas)}>✏️</button>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#4ed6c4', fontSize: 22 }}>⏲️</span>
              <span style={{ fontWeight: 700 }}>REPOSO</span>
            </div>
            <div style={{ color: '#4ed6c4', fontWeight: 700, fontSize: 20 }}>{`0${Math.floor(config.reposo/60)}:${pad(config.reposo%60)}`}</div>
            <button style={editBtnStyle} onClick={() => handleEdit('reposo', config.reposo)}>✏️</button>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#fff', fontSize: 22 }}>🔊</span>
              <span style={{ fontWeight: 700 }}>SONIDO</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={config.sonido} onChange={e => setConfig({ ...config, sonido: e.target.checked })} style={{ display: 'none' }} />
                <span style={{
                  width: 36, height: 20, borderRadius: 12, background: config.sonido ? '#ff9100' : '#888', display: 'inline-block', position: 'relative', transition: 'background 0.2s',
                }}>
                  <span style={{
                    position: 'absolute', left: config.sonido ? 18 : 2, top: 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                  }}></span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <button onClick={handleStart} style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 14, padding: '16px 0', fontWeight: 900, fontSize: 18, marginTop: 18, letterSpacing: 1, cursor: 'pointer', boxShadow: '0 2px 8px rgba(124,62,237,0.10)' }}>
          COMENZAR
        </button>
      </div>
      {editKey && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 400, padding: '32px 0 16px 0', textAlign: 'center', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>Editar valor</div>
            <input
              type="number"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              style={{ fontSize: 28, fontWeight: 900, border: 'none', borderBottom: '2px solid #ff9100', outline: 'none', width: 80, textAlign: 'center', marginBottom: 18 }}
              min={0}
            />
            <div>
              <button onClick={handleSave} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginRight: 8 }}>HECHO</button>
              <button onClick={() => setEditKey(null)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: '#222',
  borderRadius: 16,
  padding: '18px 16px 12px 16px',
  minWidth: 140,
  minHeight: 90,
  flex: '1 1 120px',
  maxWidth: 170,
  margin: 0,
  position: 'relative',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const editBtnStyle = {
  position: 'absolute',
  right: 10,
  bottom: 10,
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: 18,
  cursor: 'pointer',
  padding: 0,
};

export default Temporizador; 