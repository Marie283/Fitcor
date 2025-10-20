import React from 'react';
import './FeaturedWorkout.css';
import gimnasioImg from '../img/gimnasiomaquinas.jpg';

function FeaturedWorkout({ onVerTodo }) {
  return (
    <div className="featured-workout">
      <div className="fw-title">
        POTENCIA TU VERANO{' '}
        <span className="fw-see-all" style={{ cursor: 'pointer' }} onClick={onVerTodo}>Ver todo</span>
      </div>
      <div className="fw-banner">
        <img src={gimnasioImg} alt="Gimnasio" className="fw-img" />
        <div className="fw-desc">
          7 MIN - ABS & CORE CRUNCH TIME<br/>
          <span className="fw-details">7 min • Todos los niveles • Equipamiento ligero • Video-entrenamiento</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorkout; 