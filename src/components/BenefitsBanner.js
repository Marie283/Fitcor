import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import isotonicaImg from '../img/isotonica.jpg';

const ventajas = [
  {
    titulo: 'Descuento 15% en MyProtein',
    imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Obtén un 15% de descuento en todos los productos MyProtein usando tu código exclusivo de socio FITCOR.'
  },
  {
    titulo: 'Descuento 12% en Prozis',
    imagen: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Aprovecha un 12% de descuento en suplementos, snacks y ropa deportiva en Prozis.'
  },
  {
    titulo: 'Zapatos deportivos -20%',
    imagen: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Descuento exclusivo en zapatillas y calzado deportivo en tiendas asociadas.'
  },
  {
    titulo: 'Nutrición saludable',
    imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Acceso a menús y recetas saludables con precios especiales para socios.'
  },
  {
    titulo: 'Sesión de spa gratis',
    imagen: 'https://images.pexels.com/photos/269110/pexels-photo-269110.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Disfruta de una sesión de spa gratuita al mes en centros colaboradores.'
  },
  {
    titulo: 'Fisioterapia 2x1',
    imagen: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Promoción 2x1 en sesiones de fisioterapia para socios FITCOR.'
  },
  {
    titulo: 'Ropa deportiva exclusiva',
    imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Colección de ropa deportiva con descuentos y acceso anticipado.'
  },
  {
    titulo: 'Bebidas isotónicas gratis',
    imagen: isotonicaImg,
    descripcion: 'Recibe una bebida isotónica gratis cada semana en tu club.'
  },
  {
    titulo: 'Apps fitness premium',
    imagen: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Acceso gratuito o con descuento a apps de entrenamiento premium.'
  },
  {
    titulo: 'Entrenamientos personales',
    imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=600&h=200&fit=crop',
    descripcion: 'Sesión mensual gratuita de entrenamiento personal con nuestros coaches.'
  },
];

function BenefitsBanner() {
  const [ventajaModal, setVentajaModal] = useState(null);
  const [index, setIndex] = useState(0);
  const carruselRef = useRef();
  const timeoutRef = useRef();

  // Autoplay
  useEffect(() => {
    const next = () => setIndex(i => (i + 1) % ventajas.length);
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
    timeoutRef.current = setInterval(() => setIndex(i => (i + 1) % ventajas.length), 5000);
  };

  return (
    <div>
      <div style={{ fontWeight: 900, color: '#ff9100', fontSize: 17, margin: '18px 0 8px 8px', letterSpacing: 0.2 }}>VENTAJAS</div>
      <div
        className="ventajas-carrusel"
        ref={carruselRef}
        onTouchStart={handleUserScroll}
        onWheel={handleUserScroll}
      >
        {ventajas.map((v, i) => (
          <button
            key={i}
            className="ventaja-banner"
            style={{ backgroundImage: `url(${v.imagen})` }}
            onClick={() => setVentajaModal(v)}
            aria-label={v.titulo}
          >
            <div className="ventaja-text">{v.titulo}</div>
          </button>
        ))}
      </div>
      {ventajaModal && (
        <div className="ventaja-modal-bg" onClick={() => setVentajaModal(null)}>
          <div className="ventaja-modal" onClick={e => e.stopPropagation()}>
            <img src={ventajaModal.imagen} alt={ventajaModal.titulo} />
            <div className="ventaja-modal-title">{ventajaModal.titulo}</div>
            <div className="ventaja-modal-desc">{ventajaModal.descripcion}</div>
            <button className="ventaja-modal-close" onClick={() => setVentajaModal(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BenefitsBanner; 