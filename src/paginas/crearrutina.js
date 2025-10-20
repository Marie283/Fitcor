import React, { useRef, useState, useEffect } from 'react';
import { apiFetch } from '../api/base';
import '../components/UserProfile.css';
import ConfirmModal from '../components/ConfirmModal';

const ejerciciosEjemplo = [
  { nombre: 'Abdomen (Barra con pesas)', grupo: 'Abdominales', descripcion: 'Barra con pesas', imagen: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Abdomen (Landmine)', grupo: 'Abdominales', descripcion: 'Landmine', imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Abdominal Total', grupo: 'Abdominales', descripcion: 'Total Abdominal', imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Abdominales bicicleta', grupo: 'Abdominales, Piernas', descripcion: 'Peso con el cuerpo', imagen: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Abdominales, levantamiento de rodillas', grupo: 'Abdominales', descripcion: 'Levantamiento de rodillas', imagen: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Flexiones', grupo: 'Pecho, Tríceps', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Sentadillas', grupo: 'Piernas, Glúteos', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Press banca', grupo: 'Pecho', descripcion: 'Barra', imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Dominadas', grupo: 'Espalda, Bíceps', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Remo con barra', grupo: 'Espalda', descripcion: 'Barra', imagen: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Curl bíceps', grupo: 'Bíceps', descripcion: 'Mancuernas', imagen: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Fondos', grupo: 'Tríceps, Pecho', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Press militar', grupo: 'Hombros', descripcion: 'Barra', imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Elevaciones laterales', grupo: 'Hombros', descripcion: 'Mancuernas', imagen: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Zancadas', grupo: 'Piernas, Glúteos', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Peso muerto', grupo: 'Espalda, Piernas', descripcion: 'Barra', imagen: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Gemelos de pie', grupo: 'Piernas', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Crunch', grupo: 'Abdominales', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Plancha', grupo: 'Abdominales', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop' },
  { nombre: 'Burpees', grupo: 'Full Body', descripcion: 'Peso corporal', imagen: 'https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg?auto=compress&w=400&h=120&fit=crop' },
];

function Rutinas({ onBack, token }) {
  const [tab, setTab] = useState('crear');
  // Estado para crear plantilla
  const [nombre, setNombre] = useState('');
  const [ejercicios, setEjercicios] = useState([]);
  const [mostrarAñadir, setMostrarAñadir] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  // Estado para modal de detalle de ejercicio
  const [ejercicioDetalle, setEjercicioDetalle] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detalleEjercicioRutina, setDetalleEjercicioRutina] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rutinaToDelete, setRutinaToDelete] = useState(null);

  // Obtener rutinas del backend al cargar
  useEffect(() => {
    const fetchRutinas = async () => {
      setLoading(true);
      setError('');
      try {
        //console.log('Cargando rutinas...');
        const res = await apiFetch('/api/routines', { method: 'GET' }, token);;
        //console.log('Respuesta de rutinas:', res.status);
        const data = await res.json();
        //console.log('Datos de rutinas:', data);
        
        if (res.ok) {
          setRutinas(data);
          //console.log('✅ Rutinas cargadas:', data.length);
        } else {
          setError(data.msg || 'Error al cargar rutinas');
          //console.error('❌ Error al cargar rutinas:', data);
        }
      } catch (err) {
        setError('Error de red');
        
        //console.error('❌ Error de red al cargar rutinas:', err);
      }
      setLoading(false);
    };
    fetchRutinas();
  }, []);

  // Guardar rutina en el backend
  const handleGuardar = async () => {
    if (!nombre || ejercicios.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const payload = { 
        name: nombre, 
        description: 'Rutina personalizada', 
        exercises: ejercicios.map(e => ({ 
          name: e,
          sets: 3,
          reps: 12
        })) 
      };
      //console.log('Guardando rutina:', payload);
      
      const res = await apiFetch('/api/routines', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
      
      //console.log('Respuesta del servidor:', res.status);
      const data = await res.json();
      //console.log('Datos de respuesta:', data);
      
      if (res.ok) {
        setRutinas([...rutinas, data]);
        setNombre('');
        setEjercicios([]);
        setTab('mis');
      } else {
        setError(data.msg || 'Error al guardar rutina');
      }
    } catch (err) {
      setError('Error de red');
    }
    setLoading(false);
  };

  // Borrar rutina
  const handleBorrar = async (id) => {
    setRutinaToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmarBorrar = async () => {
    if (!rutinaToDelete) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/api/routines/${rutinaToDelete}`, {
      method: 'DELETE'
    }, token);
      if (res.ok) {
        setRutinas(rutinas.filter(r => r._id !== rutinaToDelete));
        setRutinaSeleccionada(null);
      } else {
        const data = await res.json();
        setError(data.msg || 'Error al borrar rutina');
      }
    } catch (err) {
      setError('Error de red');
    }
    setLoading(false);
    setRutinaToDelete(null);
  };

  // Añadir ejercicios
  const handleAñadirEjercicios = (seleccionados) => {
    setEjercicios([...ejercicios, ...seleccionados.filter(e => !ejercicios.includes(e))]);
    setMostrarAñadir(false);
  };

  // Mover DetalleEjercicio aquí, antes de Rutinas
  const DetalleEjercicio = ({ ejercicio, onClose, onAdd }) => {
    const instrucciones = {
      'Abdomen (Barra con pesas)': [
        'Colócate de rodillas en una esterilla, sujetando la barra con ambas manos, brazos extendidos y la barra apoyada en el suelo.',
        'Rueda la barra hacia adelante, extendiendo el tronco y manteniendo el abdomen contraído, hasta que tu cuerpo quede casi paralelo al suelo.',
        'Haz una pausa breve y regresa lentamente a la posición inicial, evitando arquear la espalda.'
      ],
      'Abdomen (Landmine)': [
        'Coloca un extremo de la barra en una esquina (landmine) y sujeta el otro extremo con ambas manos, de pie y con los pies separados al ancho de hombros.',
        'Gira el tronco llevando la barra de un lado al otro, manteniendo los brazos extendidos y el abdomen firme.',
        'Controla el movimiento y evita girar las caderas.'
      ],
      'Abdominal Total': [
        'Túmbate boca arriba, con las piernas estiradas y los brazos extendidos por detrás de la cabeza.',
        'Eleva simultáneamente el tronco y las piernas, intentando tocar los pies con las manos.',
        'Baja lentamente sin dejar caer la espalda ni las piernas al suelo.'
      ],
      'Abdominales bicicleta': [
        'Túmbate boca arriba, manos detrás de la cabeza y piernas elevadas.',
        'Lleva el codo derecho hacia la rodilla izquierda mientras extiendes la pierna derecha, alternando el movimiento como si pedalearas.',
        'Mantén el abdomen activado y no tires del cuello.'
      ],
      'Abdominales, levantamiento de rodillas': [
        'Cuelga de una barra fija con las manos separadas al ancho de hombros.',
        'Eleva las rodillas hacia el pecho, manteniendo el torso estable y sin balancearte.',
        'Baja las piernas de forma controlada.'
      ],
      'Flexiones': [
        'Coloca las manos en el suelo, alineadas con los hombros, y apoya las puntas de los pies.',
        'Mantén el cuerpo recto y baja el pecho hacia el suelo flexionando los codos.',
        'Empuja con las palmas para volver a la posición inicial.'
      ],
      'Sentadillas': [
        'Ponte de pie con los pies separados al ancho de los hombros y la espalda recta.',
        'Flexiona las rodillas y baja la cadera como si te sentaras, manteniendo el peso en los talones.',
        'Vuelve a subir apretando glúteos y muslos.'
      ],
      'Press banca': [
        'Túmbate en un banco plano, sujeta la barra con las manos un poco más abiertas que los hombros.',
        'Baja la barra controladamente hasta el pecho, manteniendo los codos a 45°.',
        'Empuja la barra hacia arriba hasta extender los brazos.'
      ],
      'Dominadas': [
        'Agárrate a una barra fija con las palmas hacia adelante y los brazos extendidos.',
        'Sube el cuerpo hasta que la barbilla supere la barra, contrayendo la espalda.',
        'Baja lentamente hasta la posición inicial.'
      ],
      'Remo con barra': [
        'De pie, flexiona ligeramente las rodillas y el torso hacia adelante, espalda recta.',
        'Sujeta la barra con las manos separadas al ancho de hombros.',
        'Lleva la barra hacia el abdomen, pegando los codos al cuerpo, y baja controladamente.'
      ],
      'Curl bíceps': [
        'Sujeta las mancuernas con los brazos extendidos a los lados del cuerpo.',
        'Flexiona los codos y sube el peso hacia los hombros, manteniendo los codos pegados al torso.',
        'Baja lentamente a la posición inicial.'
      ],
      'Fondos': [
        'Coloca las manos en barras paralelas, brazos extendidos y cuerpo recto.',
        'Baja el cuerpo flexionando los codos hasta que los hombros estén al nivel de los codos.',
        'Empuja con fuerza para volver a la posición inicial.'
      ],
      'Press militar': [
        'Sujeta la barra a la altura de los hombros, de pie y con la espalda recta.',
        'Empuja la barra por encima de la cabeza hasta extender completamente los brazos.',
        'Baja la barra controladamente a la posición inicial.'
      ],
      'Elevaciones laterales': [
        'Sujeta una mancuerna en cada mano, brazos a los lados.',
        'Eleva los brazos lateralmente hasta la altura de los hombros, manteniendo una ligera flexión en los codos.',
        'Baja lentamente controlando el movimiento.'
      ],
      'Zancadas': [
        'De pie, da un paso largo hacia adelante con una pierna.',
        'Baja la rodilla trasera casi hasta el suelo, manteniendo el torso recto.',
        'Impúlsate con la pierna adelantada para volver a la posición inicial y alterna.'
      ],
      'Peso muerto': [
        'Coloca la barra en el suelo frente a ti, pies al ancho de caderas.',
        'Flexiona las caderas y las rodillas para agarrar la barra, espalda recta.',
        'Levanta la barra extendiendo caderas y rodillas a la vez, manteniendo la barra cerca del cuerpo.'
      ],
      'Gemelos de pie': [
        'Ponte de pie, pies paralelos y separados al ancho de caderas.',
        'Eleva los talones lo más alto posible, contrayendo los gemelos.',
        'Baja lentamente hasta apoyar completamente los pies.'
      ],
      'Crunch': [
        'Túmbate boca arriba con las rodillas flexionadas y los pies apoyados en el suelo.',
        'Coloca las manos detrás de la cabeza o cruzadas sobre el pecho.',
        'Eleva el tronco contrayendo el abdomen, sin despegar la zona lumbar del suelo.'
      ],
      'Plancha': [
        'Apoya los antebrazos y las puntas de los pies en el suelo, cuerpo recto.',
        'Mantén el abdomen y glúteos contraídos, evitando que la cadera caiga o suba.',
        'Respira de forma controlada y mantén la posición el tiempo indicado.'
      ],
      'Burpees': [
        'De pie, baja a una sentadilla y apoya las manos en el suelo.',
        'Lanza los pies hacia atrás para quedar en posición de flexión, realiza una flexión de pecho.',
        'Vuelve a la posición de sentadilla y salta explosivamente hacia arriba.'
      ],
    };
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: 18, maxWidth: 370, width: '95vw', padding: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, left: 16, background: 'none', border: 'none', fontSize: 32, color: '#ff9100', cursor: 'pointer', zIndex: 2, fontWeight: 900, lineHeight: 1 }} aria-label="Volver">
            <span style={{ fontWeight: 900, fontSize: 36, display: 'inline-block', lineHeight: 1 }}>←</span>
          </button>
          <img src={ejercicio.imagen} alt={ejercicio.nombre} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <div style={{ padding: 20 }}>
            <div style={{ borderBottom: '3px solid #ff9100', width: 40, margin: '0 auto 12px auto' }} />
            <h3 style={{ fontWeight: 900, fontSize: 19, textAlign: 'center', margin: '12px 0 10px 0', textTransform: 'uppercase' }}>{ejercicio.nombre}</h3>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#ff9100', margin: '0 2px' }} />
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#eee', margin: '0 2px' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>INSTRUCCIONES</div>
            <ol style={{ paddingLeft: 18, marginBottom: 18 }}>
              {(instrucciones[ejercicio.nombre] || ejercicio.instrucciones || ['Ejecuta el ejercicio con buena técnica.']).map((ins, idx) => (
                <li key={idx} style={{ marginBottom: 6, fontSize: 15, color: '#222' }}>{ins}</li>
              ))}
            </ol>
            {onAdd && (
              <button
                onClick={() => { onAdd([ejercicio.nombre]); onClose(); }}
                style={{ width: '100%', background: '#8e44ad', color: '#fff', border: 'none', borderRadius: 16, padding: '14px 0', fontWeight: 900, fontSize: 17, letterSpacing: 1, cursor: 'pointer', marginTop: 8 }}
              >
                Añadir ejercicio
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Pantalla para añadir ejercicios
  function AñadirEjercicios({ onBack, onAdd }) {
    const [busqueda, setBusqueda] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);
    const [detalle, setDetalle] = useState(null);
    const ejerciciosFiltrados = ejerciciosEjemplo.filter(ej =>
      ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    const toggleSeleccion = (nombre) => {
      setSeleccionados(sel =>
        sel.includes(nombre) ? sel.filter(e => e !== nombre) : [...sel, nombre]
      );
    };
    // Instrucciones inventadas
    const instrucciones = {
      'Abdomen (Barra con pesas)': [
        'Colócate de rodillas en una esterilla, sujetando la barra con ambas manos, brazos extendidos y la barra apoyada en el suelo.',
        'Rueda la barra hacia adelante, extendiendo el tronco y manteniendo el abdomen contraído, hasta que tu cuerpo quede casi paralelo al suelo.',
        'Haz una pausa breve y regresa lentamente a la posición inicial, evitando arquear la espalda.'
      ],
      'Abdomen (Landmine)': [
        'Coloca un extremo de la barra en una esquina (landmine) y sujeta el otro extremo con ambas manos, de pie y con los pies separados al ancho de hombros.',
        'Gira el tronco llevando la barra de un lado al otro, manteniendo los brazos extendidos y el abdomen firme.',
        'Controla el movimiento y evita girar las caderas.'
      ],
      'Abdominal Total': [
        'Túmbate boca arriba, con las piernas estiradas y los brazos extendidos por detrás de la cabeza.',
        'Eleva simultáneamente el tronco y las piernas, intentando tocar los pies con las manos.',
        'Baja lentamente sin dejar caer la espalda ni las piernas al suelo.'
      ],
      'Abdominales bicicleta': [
        'Túmbate boca arriba, manos detrás de la cabeza y piernas elevadas.',
        'Lleva el codo derecho hacia la rodilla izquierda mientras extiendes la pierna derecha, alternando el movimiento como si pedalearas.',
        'Mantén el abdomen activado y no tires del cuello.'
      ],
      'Abdominales, levantamiento de rodillas': [
        'Cuelga de una barra fija con las manos separadas al ancho de hombros.',
        'Eleva las rodillas hacia el pecho, manteniendo el torso estable y sin balancearte.',
        'Baja las piernas de forma controlada.'
      ],
      'Flexiones': [
        'Coloca las manos en el suelo, alineadas con los hombros, y apoya las puntas de los pies.',
        'Mantén el cuerpo recto y baja el pecho hacia el suelo flexionando los codos.',
        'Empuja con las palmas para volver a la posición inicial.'
      ],
      'Sentadillas': [
        'Ponte de pie con los pies separados al ancho de los hombros y la espalda recta.',
        'Flexiona las rodillas y baja la cadera como si te sentaras, manteniendo el peso en los talones.',
        'Vuelve a subir apretando glúteos y muslos.'
      ],
      'Press banca': [
        'Túmbate en un banco plano, sujeta la barra con las manos un poco más abiertas que los hombros.',
        'Baja la barra controladamente hasta el pecho, manteniendo los codos a 45°.',
        'Empuja la barra hacia arriba hasta extender los brazos.'
      ],
      'Dominadas': [
        'Agárrate a una barra fija con las palmas hacia adelante y los brazos extendidos.',
        'Sube el cuerpo hasta que la barbilla supere la barra, contrayendo la espalda.',
        'Baja lentamente hasta la posición inicial.'
      ],
      'Remo con barra': [
        'De pie, flexiona ligeramente las rodillas y el torso hacia adelante, espalda recta.',
        'Sujeta la barra con las manos separadas al ancho de hombros.',
        'Lleva la barra hacia el abdomen, pegando los codos al cuerpo, y baja controladamente.'
      ],
      'Curl bíceps': [
        'Sujeta las mancuernas con los brazos extendidos a los lados del cuerpo.',
        'Flexiona los codos y sube el peso hacia los hombros, manteniendo los codos pegados al torso.',
        'Baja lentamente a la posición inicial.'
      ],
      'Fondos': [
        'Coloca las manos en barras paralelas, brazos extendidos y cuerpo recto.',
        'Baja el cuerpo flexionando los codos hasta que los hombros estén al nivel de los codos.',
        'Empuja con fuerza para volver a la posición inicial.'
      ],
      'Press militar': [
        'Sujeta la barra a la altura de los hombros, de pie y con la espalda recta.',
        'Empuja la barra por encima de la cabeza hasta extender completamente los brazos.',
        'Baja la barra controladamente a la posición inicial.'
      ],
      'Elevaciones laterales': [
        'Sujeta una mancuerna en cada mano, brazos a los lados.',
        'Eleva los brazos lateralmente hasta la altura de los hombros, manteniendo una ligera flexión en los codos.',
        'Baja lentamente controlando el movimiento.'
      ],
      'Zancadas': [
        'De pie, da un paso largo hacia adelante con una pierna.',
        'Baja la rodilla trasera casi hasta el suelo, manteniendo el torso recto.',
        'Impúlsate con la pierna adelantada para volver a la posición inicial y alterna.'
      ],
      'Peso muerto': [
        'Coloca la barra en el suelo frente a ti, pies al ancho de caderas.',
        'Flexiona las caderas y las rodillas para agarrar la barra, espalda recta.',
        'Levanta la barra extendiendo caderas y rodillas a la vez, manteniendo la barra cerca del cuerpo.'
      ],
      'Gemelos de pie': [
        'Ponte de pie, pies paralelos y separados al ancho de caderas.',
        'Eleva los talones lo más alto posible, contrayendo los gemelos.',
        'Baja lentamente hasta apoyar completamente los pies.'
      ],
      'Crunch': [
        'Túmbate boca arriba con las rodillas flexionadas y los pies apoyados en el suelo.',
        'Coloca las manos detrás de la cabeza o cruzadas sobre el pecho.',
        'Eleva el tronco contrayendo el abdomen, sin despegar la zona lumbar del suelo.'
      ],
      'Plancha': [
        'Apoya los antebrazos y las puntas de los pies en el suelo, cuerpo recto.',
        'Mantén el abdomen y glúteos contraídos, evitando que la cadera caiga o suba.',
        'Respira de forma controlada y mantén la posición el tiempo indicado.'
      ],
      'Burpees': [
        'De pie, baja a una sentadilla y apoya las manos en el suelo.',
        'Lanza los pies hacia atrás para quedar en posición de flexión, realiza una flexión de pecho.',
        'Vuelve a la posición de sentadilla y salta explosivamente hacia arriba.'
      ],
    };
    return (
      <div style={{ maxWidth: 430, margin: '0 auto', padding: 16, fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif`, paddingBottom: 90, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 22, marginRight: 8, cursor: 'pointer', color: '#ff9100' }}>←</button>
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: 20, letterSpacing: '-1px', color: '#222' }}>Añadir ejercicios</h2>
        </div>
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar ejercicios"
          style={{ width: '100%', padding: 12, borderRadius: 18, border: '1.5px solid #eee', marginBottom: 18, fontSize: 15, fontFamily: 'inherit', outline: 'none', background: '#f6f7fb' }}
        />
        <div style={{ marginBottom: 18, color: '#ff9100', fontWeight: 700, textAlign: 'right', fontSize: 14, cursor: 'pointer' }}>Ordenar por</div>
        <div>
          {ejerciciosFiltrados.map((ej, i) => (
            <div key={i} onClick={() => setDetalle(ej)} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
              <img src={ej.imagen} alt={ej.nombre} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', margin: 8 }} />
              <div style={{ flex: 1, padding: '0 8px' }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>{ej.nombre}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{ej.grupo} · {ej.descripcion}</div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); toggleSeleccion(ej.nombre); }}
                style={{ background: 'none', border: 'none', color: '#8e44ad', fontSize: 28, marginRight: 12, cursor: 'pointer' }}
              >
                {seleccionados.includes(ej.nombre) ? '✔️' : '+'}
              </button>
            </div>
          ))}
          {/* Espaciador para scroll extra */}
          <div style={{ height: 120 }} />
        </div>
        <button
          onClick={() => onAdd(seleccionados)}
          disabled={seleccionados.length === 0}
          style={{
            width: '100%',
            background: seleccionados.length ? '#8e44ad' : '#d1b3e0',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            padding: '14px 0',
            fontWeight: 900,
            fontSize: 17,
            letterSpacing: 1,
            cursor: seleccionados.length ? 'pointer' : 'not-allowed',
            position: 'fixed',
            left: '50%',
            bottom: 70,
            transform: 'translateX(-50%)',
            maxWidth: 430,
            zIndex: 100
          }}
        >
          Añadir ejercicios
        </button>
        {detalle && <DetalleEjercicio ejercicio={detalle} onClose={() => setDetalle(null)} onAdd={nombres => { onAdd(nombres); setDetalle(null); }} />}
      </div>
    );
  }

  // --- UI PRINCIPAL ---
  if (mostrarAñadir) {
    return <AñadirEjercicios onBack={() => setMostrarAñadir(false)} onAdd={handleAñadirEjercicios} />;
  }

  // Modal de detalles de rutina
  const DetalleRutina = ({ rutina, onClose }) => (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 18, maxWidth: 350, width: '90vw', padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#ff9100', cursor: 'pointer' }}>✕</button>
        <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>{rutina.name || rutina.nombre}</h3>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 16 }}>{Array.isArray(rutina.exercises) ? rutina.exercises.length : (Array.isArray(rutina.ejercicios) ? rutina.ejercicios.length : 0)} ejercicios</div>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {(Array.isArray(rutina.exercises) ? rutina.exercises : (Array.isArray(rutina.ejercicios) ? rutina.ejercicios : [])).map((ej, i) => {
            const nombreEj = ej.name || ej;
            return (
              <li key={i} style={{ background: '#f6f7fb', borderRadius: 10, padding: '8px 12px', marginBottom: 8, fontSize: 15, cursor: 'pointer' }}
                onClick={() => {
                  const datosEjemplo = ejerciciosEjemplo.find(e => e.nombre.toLowerCase() === nombreEj.toLowerCase());
                  setDetalleEjercicioRutina(datosEjemplo ? datosEjemplo : { nombre: nombreEj });
                }}
              >
                {nombreEj}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', padding: 16, fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif` }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 22, marginRight: 8, cursor: 'pointer', color: '#ff9100' }}>←</button>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 22, letterSpacing: '-1px', color: '#222' }}>Rutinas</h2>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #eee', marginBottom: 18 }}>
        <div
          onClick={() => setTab('crear')}
          style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 16, color: tab === 'crear' ? '#ff9100' : '#222', cursor: 'pointer', padding: '10px 0', borderBottom: tab === 'crear' ? '4px solid #ff9100' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          Crear plantilla
        </div>
        <div
          onClick={() => setTab('mis')}
          style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 16, color: tab === 'mis' ? '#ff9100' : '#222', cursor: 'pointer', padding: '10px 0', borderBottom: tab === 'mis' ? '4px solid #ff9100' : '4px solid transparent', transition: 'all 0.2s' }}
        >
          Mis plantillas
        </div>
      </div>
      {/* Contenido de cada tab */}
      {tab === 'crear' && (
        <>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 700, fontSize: 15, color: '#ff9100' }}>Nombre de la rutina</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Core, Full Body..."
              style={{ width: '100%', padding: 10, borderRadius: 12, border: '1.5px solid #eee', marginTop: 6, fontSize: 15, fontFamily: 'inherit', outline: 'none', marginBottom: 12 }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 700, fontSize: 15, color: '#ff9100' }}>Ejercicios</label>
            {ejercicios.length === 0 && <div style={{ color: '#aaa', fontSize: 15, margin: '8px 0' }}>Aún no has añadido ejercicios</div>}
            {ejercicios.map((ej, i) => (
              <div key={i} style={{ background: '#f6f7fb', borderRadius: 10, padding: '8px 12px', marginBottom: 6, fontSize: 15 }}>{ej}</div>
            ))}
            <button onClick={() => setMostrarAñadir(true)} style={{ width: '100%', background: '#fff', border: '1.5px solid #8e44ad', color: '#8e44ad', fontWeight: 700, fontSize: 15, borderRadius: 12, padding: '10px 0', marginTop: 8, cursor: 'pointer' }}>+ Añadir ejercicios</button>
          </div>
          <button
            onClick={handleGuardar}
            disabled={!nombre || ejercicios.length === 0}
            style={{ width: '100%', background: (!nombre || ejercicios.length === 0) ? '#d1b3e0' : '#8e44ad', color: '#fff', border: 'none', borderRadius: 16, padding: '14px 0', fontWeight: 900, fontSize: 17, letterSpacing: 1, cursor: (!nombre || ejercicios.length === 0) ? 'not-allowed' : 'pointer', marginTop: 12 }}
          >
            Guardar rutina
          </button>
        </>
      )}
      {tab === 'mis' && (
        <div style={{ marginTop: 18 }}>
          {loading && <div style={{ textAlign: 'center', marginTop: 40 }}>Cargando rutinas...</div>}
          {error && <div style={{ color: '#ff9100', fontSize: 16, textAlign: 'center', marginTop: 40 }}>{error}</div>}
          {rutinas.length === 0 && !loading && !error && <div style={{ color: '#aaa', fontSize: 16, textAlign: 'center', marginTop: 40 }}>Aún no tienes plantillas guardadas</div>}
          {rutinas.map((r, i) => (
            <div key={r._id} onClick={() => setRutinaSeleccionada(r)} style={{ background: '#f6f7fb', borderRadius: 14, padding: '16px 14px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
              <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 4 }}>{r.name}</div>
              <div style={{ color: '#888', fontSize: 14 }}>{r.exercises.length} ejercicios</div>
              <button
                onClick={e => { e.stopPropagation(); handleBorrar(r._id); }}
                style={{ background: 'none', border: 'none', color: '#ff9100', fontSize: 20, marginTop: 10, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          ))}
          {rutinaSeleccionada && <DetalleRutina rutina={rutinaSeleccionada} onClose={() => setRutinaSeleccionada(null)} />}
          {detalleEjercicioRutina && <DetalleEjercicio ejercicio={detalleEjercicioRutina} onClose={() => setDetalleEjercicioRutina(null)} />}
          {/* Espaciador para scroll extra */}
          <div style={{ height: 120 }} />
        </div>
      )}
      
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setRutinaToDelete(null);
        }}
        onConfirm={confirmarBorrar}
        title="Eliminar rutina"
        message="¿Seguro que quieres borrar esta rutina? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}

export default Rutinas;
