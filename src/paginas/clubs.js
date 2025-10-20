import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const clubsEjemplo = [
  {
    nombre: 'Calle Serramagna',
    ciudad: 'Burgos',
    imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
  {
    nombre: 'Gym Center Madrid',
    ciudad: 'Madrid',
    imagen: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
  {
    nombre: 'FitZone Barcelona',
    ciudad: 'Barcelona',
    imagen: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&w=400&h=120&fit=crop',
  },
];

const gimnasiosMapa = [
  { nombre: 'FITCOR SEGOVIA AVENIDA DEL OBISPO QUESADA', lat: 40.9481, lng: -4.1184, calle: 'Av. del Obispo Quesada, 12' },
  { nombre: 'FITCOR BURGOS CALLE SERRAMAGNA', lat: 42.3439, lng: -3.6969, calle: 'C. Serramagna, 8' },
  { nombre: 'FITCOR BURGOS CALLE DE LA PLAZA', lat: 42.3435, lng: -3.7010, calle: 'C. de la Plaza, 3' },
  { nombre: 'FITCOR A CORUÑA AVENIDA DE CASTELAO', lat: 43.3623, lng: -8.4115, calle: 'Av. de Castelao, 22' },
  { nombre: 'FITCOR Madrid', lat: 40.4168, lng: -3.7038, calle: 'C. de Alcalá, 45' },
  { nombre: 'FITCOR Barcelona', lat: 41.3874, lng: 2.1686, calle: 'C. de Balmes, 101' },
  { nombre: 'FITCOR Sevilla', lat: 37.3886, lng: -5.9823, calle: 'Av. de la Constitución, 18' },
  { nombre: 'FITCOR Valencia', lat: 39.4699, lng: -0.3763, calle: 'C. de Colón, 7' },
  { nombre: 'FITCOR Bilbao', lat: 43.263, lng: -2.935, calle: 'C. Gran Vía, 56' },
  { nombre: 'FITCOR París', lat: 48.8566, lng: 2.3522, calle: 'Rue de Rivoli, 120' },
  { nombre: 'FITCOR Berlín', lat: 52.52, lng: 13.405, calle: 'Friedrichstraße, 200' },
  { nombre: 'FITCOR Roma', lat: 41.9028, lng: 12.4964, calle: 'Via del Corso, 80' },
  { nombre: 'FITCOR Londres', lat: 51.5074, lng: -0.1278, calle: 'Oxford St, 300' },
  { nombre: 'FITCOR Lisboa', lat: 38.7223, lng: -9.1393, calle: 'Av. da Liberdade, 150' },
  { nombre: 'FITCOR Ámsterdam', lat: 52.3676, lng: 4.9041, calle: 'Damrak, 50' },
  { nombre: 'FITCOR Bruselas', lat: 50.8503, lng: 4.3517, calle: 'Rue Neuve, 22' },
  { nombre: 'FITCOR Praga', lat: 50.0755, lng: 14.4378, calle: 'Václavské náměstí, 10' },
  { nombre: 'FITCOR Viena', lat: 48.2082, lng: 16.3738, calle: 'Mariahilfer Str., 99' },
  { nombre: 'FITCOR Varsovia', lat: 52.2297, lng: 21.0122, calle: 'ul. Marszałkowska, 120' },
  { nombre: 'FITCOR Estocolmo', lat: 59.3293, lng: 18.0686, calle: 'Drottninggatan, 80' },
  { nombre: 'FITCOR Copenhague', lat: 55.6761, lng: 12.5683, calle: 'Strøget, 40' },
  { nombre: 'FITCOR Dublín', lat: 53.3498, lng: -6.2603, calle: 'O’Connell St, 15' },
  { nombre: 'FITCOR Múnich', lat: 48.1351, lng: 11.582, calle: 'Leopoldstraße, 60' },
  { nombre: 'FITCOR Milán', lat: 45.4642, lng: 9.19, calle: 'Corso Buenos Aires, 200' },
  { nombre: 'FITCOR Oporto', lat: 41.1579, lng: -8.6291, calle: 'Rua de Santa Catarina, 300' },
  { nombre: 'FITCOR Atenas', lat: 37.9838, lng: 23.7275, calle: 'Ermou, 45' },
  { nombre: 'FITCOR Budapest', lat: 47.4979, lng: 19.0402, calle: 'Andrássy út, 70' },
  { nombre: 'FITCOR Zurich', lat: 47.3769, lng: 8.5417, calle: 'Bahnhofstrasse, 88' },
  { nombre: 'FITCOR Oslo', lat: 59.9139, lng: 10.7522, calle: 'Karl Johans gate, 20' },
  { nombre: 'FITCOR Helsinki', lat: 60.1699, lng: 24.9384, calle: 'Aleksanterinkatu, 12' },
  { nombre: 'FITCOR Nueva York', lat: 40.7128, lng: -74.006, calle: '5th Ave, 500' },
  { nombre: 'FITCOR Los Ángeles', lat: 34.0522, lng: -118.2437, calle: 'Sunset Blvd, 300' },
  { nombre: 'FITCOR Miami', lat: 25.7617, lng: -80.1918, calle: 'Collins Ave, 100' },
  { nombre: 'FITCOR Chicago', lat: 41.8781, lng: -87.6298, calle: 'N Michigan Ave, 400' },
  { nombre: 'FITCOR Tokio', lat: 35.6895, lng: 139.6917, calle: 'Shibuya, 1-1' },
  { nombre: 'FITCOR Osaka', lat: 34.6937, lng: 135.5023, calle: 'Dotonbori, 2-2' },
  { nombre: 'FITCOR Sapporo', lat: 43.0618, lng: 141.3545, calle: 'Odori, 3-3' },
  { nombre: 'FITCOR Nagoya', lat: 35.1815, lng: 136.9066, calle: 'Sakae, 4-4' },
  { nombre: 'FITCOR Zaragoza', lat: 41.6488, lng: -0.8891, calle: 'Paseo Independencia, 10' },
  { nombre: 'FITCOR Málaga', lat: 36.7213, lng: -4.4214, calle: 'Calle Larios, 5' },
];

const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

function Clubs() {
  const [clubs, setClubs] = React.useState(clubsEjemplo);
  const [showMap, setShowMap] = React.useState(false);

  // Función para agregar a favoritos
  const handleAgregarFavorito = (gim) => {
    if (!clubs.some(c => c.nombre === gim.nombre)) {
      setClubs([{ nombre: gim.nombre, ciudad: '', imagen: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&w=400&h=120&fit=crop' }, ...clubs]);
    }
  };

  return (
    <div className="clubs-responsive" style={{ maxWidth: '100vw', margin: '0 auto', padding: '16px 0', fontFamily: `'Arial Rounded MT Bold', Arial, sans-serif` }}>
      {/* Clubes favoritos */}
      <div style={{ background: 'linear-gradient(90deg, #ff9100 60%, #ffb347 100%)', padding: '18px 0 0 0', borderRadius: '0 0 24px 24px', marginBottom: 18 }}>
        <div style={{ fontWeight: 900, fontSize: 19, color: '#fff', marginLeft: 18, marginBottom: 10 }}>MIS CLUBES FAVORITOS</div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 0 18px 18px' }}>
          {clubs.map((club, i) => (
            <div key={i} style={{ minWidth: 170, background: '#222', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', position: 'relative' }}>
              <img src={club.imagen} alt={club.nombre} style={{ width: '100%', height: 80, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 8, left: 8, background: '#6C2BD7', color: '#fff', borderRadius: 8, fontSize: 12, padding: '2px 8px', fontWeight: 700 }}>Gimnasio de</div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 16, margin: '8px 0 0 10px' }}>{club.nombre}</div>
              <div style={{ color: '#fff', fontSize: 13, margin: '0 0 10px 10px' }}>{club.ciudad}</div>
            </div>
          ))}
          {/* Card para agregar */}
          <div style={{ minWidth: 170, border: '2px dashed #fff', borderRadius: 14, background: 'rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 120, cursor: 'pointer' }}
            onClick={() => setShowMap(true)}
          >
            <div style={{ fontSize: 32, color: '#fff', marginBottom: 6 }}>+</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Agregar gimnasio</div>
          </div>
        </div>
      </div>
      {/* Modal del mapa */}
      {showMap && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setShowMap(false); }}
        >
          <div style={{ background: '#fff', borderRadius: 18, maxWidth: 500, width: '95vw', padding: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
            <button onClick={() => setShowMap(false)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.85)', border: 'none', fontSize: 28, color: '#ff9100', cursor: 'pointer', zIndex: 10, fontWeight: 900, lineHeight: 1, borderRadius: 16, padding: '2px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>✕</button>
            <div style={{ height: 420, width: '100%' }}>
              <MapContainer center={[40.4168, -3.7038]} zoom={3} style={{ height: '100%', width: '100%', borderRadius: 18 }} scrollWheelZoom={false}>
                <ResizeMap />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {gimnasiosMapa.map((g, i) => (
                  <Marker key={i} position={[g.lat, g.lng]} icon={icon}>
                    <Popup>
                      <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 4 }}>{g.nombre}</div>
                      <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>{g.calle}</div>
                      <button onClick={() => handleAgregarFavorito(g)} style={{ background: '#6C2BD7', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                        Agregar a favoritos
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
      {/* Gráfica de horas populares (estática) */}
      <div style={{ background: '#fff', borderRadius: 18, margin: '0 14px 18px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 18 }}>
        <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>Calle Serramagna – Horas más populares del club</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: 90, gap: 6, margin: '18px 0 8px 0', justifyContent: 'center' }}>
          {/* Datos inventados de afluencia por día (lunes a domingo) */}
          {[
            { dia: 'lu', valor: 30 },
            { dia: 'ma', valor: 40 },
            { dia: 'mi', valor: 35 },
            { dia: 'ju', valor: 60 },
            { dia: 'vi', valor: 80 },
            { dia: 'sá', valor: 65 },
            { dia: 'do', valor: 25 },
          ].map((d, i) => (
            <div key={d.dia} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22 }}>
              <div style={{ height: d.valor, width: 16, borderRadius: 6, background: i === 4 ? '#ff9100' : '#6C2BD7', marginBottom: 4, transition: 'height 0.3s' }}></div>
              <div style={{ fontSize: 13, color: i === 4 ? '#ff9100' : '#888', fontWeight: i === 4 ? 900 : 700 }}>{d.dia}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#ff9100', fontSize: 13, marginTop: 8 }}>● Hora basada en predicciones</div>
      </div>
      {/* Servicios en el gimnasio */}
      <div style={{ margin: '0 14px 0 14px' }}>
        <div style={{ fontWeight: 900, fontSize: 15, color: '#222', marginBottom: 10 }}>SERVICIOS EN EL GIMNASIO</div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0 12px 14px', borderBottom: '1px solid #f2f2f2', fontWeight: 700, fontSize: 15 }}>
            <span style={{ marginRight: 10, fontSize: 20 }}>📅</span> Horario de clases colectivas <span style={{ flex: 1 }} /> <span style={{ color: '#ff9100', fontSize: 18, marginRight: 14 }}>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0 12px 14px', borderBottom: '1px solid #f2f2f2', fontWeight: 700, fontSize: 15 }}>
            <span style={{ marginRight: 10, fontSize: 20 }}>👁️‍🗨️</span> Encuentra entrenador personal <span style={{ flex: 1 }} /> <span style={{ color: '#ff9100', fontSize: 18, marginRight: 14 }}>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0 12px 14px', fontWeight: 700, fontSize: 15 }}>
            <span style={{ marginRight: 10, fontSize: 20 }}>➕</span> Encuentra fisioterapeuta <span style={{ flex: 1 }} /> <span style={{ color: '#ff9100', fontSize: 18, marginRight: 14 }}>→</span>
          </div>
        </div>
        <div style={{ fontWeight: 900, fontSize: 15, color: '#222', margin: '18px 0 10px 0' }}>INSTALACIONES Y SOPORTE</div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0 12px 14px', borderBottom: '1px solid #f2f2f2', fontWeight: 700, fontSize: 15 }}>
            <span style={{ marginRight: 10, fontSize: 20 }}>💬</span> Chat y ayuda <span style={{ flex: 1 }} /> <span style={{ color: '#ff9100', fontSize: 18, marginRight: 14 }}>↗</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0 12px 14px', fontWeight: 700, fontSize: 15 }}>
            <span style={{ marginRight: 10, fontSize: 20 }}>🏢</span> Instalaciones del club <span style={{ flex: 1 }} /> <span style={{ color: '#ff9100', fontSize: 18, marginRight: 14 }}>↗</span>
          </div>
        </div>
      </div>
      {/* Botón buscar gimnasio */}
      <div style={{ margin: '30px 14px 0 14px' }}>
        <button style={{ width: '100%', background: '#6C2BD7', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 0', fontWeight: 900, fontSize: 18, letterSpacing: 1, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          onClick={() => setShowMap(true)}
        >
          <span style={{ fontSize: 22, marginRight: 10 }}>📍</span> BUSCAR UN GIMNASIO
        </button>
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}

export default Clubs; 