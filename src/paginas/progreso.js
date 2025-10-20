import React, { useState } from 'react';
import ProgresoVisitas from './ProgresoVisitas';
import ProgresoEntrenamientos from './ProgresoEntrenamientos';
import ProgresoDatos from './ProgresoDatos';
import ProgresoInsignias from './ProgresoInsignias';

function Progreso({ onGotoEntrenamiento }) {
  const [tab, setTab] = useState('Mis datos');

  let contenido = null;
  if (tab === 'Visitas') {
    contenido = <ProgresoVisitas activeTab={tab} onTabChange={setTab} />;
  } else if (tab === 'Entrenamientos') {
    contenido = <ProgresoEntrenamientos activeTab={tab} onTabChange={setTab} onVerEntrenamientos={onGotoEntrenamiento} />;
  } else if (tab === 'Mis datos') {
    contenido = <ProgresoDatos activeTab={tab} onTabChange={setTab} />;
  } else if (tab === 'Insignias') {
    contenido = <ProgresoInsignias activeTab={tab} onTabChange={setTab} />;
  }

  return (
    <div className="progreso-responsive" style={{ maxWidth: '100vw', margin: '0 auto', padding: '16px 0', fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif` }}>
      {contenido}
    </div>
  );
}

export default Progreso; 