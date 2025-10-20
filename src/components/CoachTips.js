import React, { useState, useRef, useEffect } from 'react';
import './CoachTips.css';
import entrenadorImg from '../img/entrenador.jpg';
import comidaImg from '../img/comida.jpg';
import gimnasioImg from '../img/gimnasio.jpg';

const tips = [
  { title: 'ENTRENA BIEN', img: gimnasioImg, desc: 'Entrena con constancia y escucha a tu cuerpo para evitar lesiones.' },
  { title: 'COME BIEN', img: comidaImg, desc: 'Mantén una alimentación equilibrada y variada para potenciar tus resultados.' },
  { title: 'VIVE BIEN', img: entrenadorImg, desc: 'Descansa, hidrátate y disfruta del proceso. El bienestar es integral.' },
];

function CoachTips() {
  const [tipModal, setTipModal] = useState(null);
  const [index, setIndex] = useState(0);
  const carruselRef = useRef();
  const timeoutRef = useRef();

  // Autoplay
  useEffect(() => {
    const next = () => setIndex(i => (i + 1) % tips.length);
    timeoutRef.current = setInterval(next, 5000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  // Scroll al banner activo
  useEffect(() => {
    if (carruselRef.current) {
      carruselRef.current.scrollTo({
        left: carruselRef.current.offsetWidth * index,
        behavior: 'smooth'
      });
    }
  }, [index]);

  // Pausa autoplay al interactuar
  const handleUserScroll = () => {
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => setIndex(i => (i + 1) % tips.length), 5000);
  };

  return (
    <div>
      <div style={{ fontWeight: 900, color: '#ff9100', fontSize: 17, margin: '18px 0 8px 8px', letterSpacing: 0.2 }}>CONSEJOS DEL COACH</div>
      <div
        className="ventajas-carrusel"
        ref={carruselRef}
        onTouchStart={handleUserScroll}
        onWheel={handleUserScroll}
      >
        {tips.map((tip, i) => (
          <button
            key={i}
            className="ventaja-banner"
            style={{ backgroundImage: `url(${tip.img})` }}
            onClick={() => setTipModal(tip)}
            aria-label={tip.title}
          >
            <div className="ventaja-text">{tip.title}</div>
          </button>
        ))}
      </div>
      {tipModal && (
        <div className="ventaja-modal-bg" onClick={() => setTipModal(null)}>
          <div className="ventaja-modal" onClick={e => e.stopPropagation()}>
            <img src={tipModal.img} alt={tipModal.title} />
            <div className="ventaja-modal-title">{tipModal.title}</div>
            <div className="ventaja-modal-desc">{tipModal.desc}</div>
            <button className="ventaja-modal-close" onClick={() => setTipModal(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoachTips; 