import React from 'react';
import './WeekVisits.css';

// Utilidad para obtener la semana actual (lunes a domingo) según la fecha del sistema
function getCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=domingo, 1=lunes...
  // Ajuste para que la semana empiece en lunes
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const week = [];
  const labels = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push({
      label: labels[i],
      num: d.getDate(),
      date: d,
      isToday:
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear(),
    });
  }
  return week;
}

function WeekVisits({ onVerVisitas }) {
  const week = getCurrentWeek();
  return (
    <div className="week-visits">
      <div className="week-title">TU SEMANA <span className="see-visits" onClick={onVerVisitas} style={{cursor:'pointer'}}>Ver visitas</span></div>
      <div className="days-row">
        {week.map((d, i) => (
          <div
            key={d.num + '-' + d.label}
            className={`day-circle${d.isToday ? ' active' : ''}`}
          >
            <div className="day-num">{d.num}</div>
            <div className="day-label">{d.label}</div>
          </div>
        ))}
      </div>
      <div className="set-goal">Fija tu objetivo de visitas <span>★</span></div>
    </div>
  );
}

export default WeekVisits; 