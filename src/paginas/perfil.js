import React, { useRef, useState } from 'react';
import '../components/UserProfile.css';

function Perfil({ onBack, foto, setFoto, onLogout }) {
  const fileInput = useRef();
  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState('subscripcion');
  const [mostrarPagosAnteriores, setMostrarPagosAnteriores] = useState(false);

  const handleFotoClick = () => {
    fileInput.current.click();
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFoto(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cierra el modal si se hace click fuera del contenido
  const handleModalBgClick = (e) => {
    if (e.target.className === 'modal-bg') setShowModal(false);
  };

  const roundedFont = {
    fontFamily: `'Arial Rounded MT Bold', 'Segoe UI', Arial, sans-serif`
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <button className="back-btn" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span className="back-text">Volver</span>
        </button>
        <div className="profile-avatar" onClick={handleFotoClick} style={{ cursor: 'pointer' }}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          {foto ? (
            <img src={foto} alt="Foto de perfil" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '2.5rem', color: '#ff9100' }}>👤</span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            style={{ display: 'none' }}
            onChange={handleFotoChange}
          />
          <span style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: '#ff9100',
            color: '#fff',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            border: '2px solid #fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            zIndex: 3
          }}>✏️</span>
        </div>
        <div className="profile-name"> MARÍA</div>
        <div className="profile-id">MemberID: 70024*****
        </div>
        <div className="profile-type">Comfort Member</div>
      </div>
      <div className="profile-options">
        <div className="profile-option" onClick={() => { setShowModal(true); setModalTipo('subscripcion'); }}>
          Suscripción y extras
          <span className="profile-option-icon">↗</span>
        </div>
        <div className="profile-option" onClick={() => { setShowModal(true); setModalTipo('pagos'); }}>
          Pagos
          <span className="profile-option-icon">↗</span>
        </div>
        <div className="profile-option">
          Mis datos personales
          <span className="profile-option-icon">↗</span>
        </div>
        <div className="profile-option">
          Personaliza tu información de fitness
          <span className="profile-option-icon">↗</span>
        </div>
        <button onClick={typeof onLogout === 'function' ? onLogout : undefined} style={{ width: '100%', marginTop: 18, background: '#fff', color: '#ff9100', border: '1.5px solid #ff9100', borderRadius: 10, padding: '12px 0', fontWeight: 900, fontSize: 17, cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </div>

      {showModal && (
        <div className="modal-bg" onClick={handleModalBgClick} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="modal-content" style={{
            background: '#fff',
            borderRadius: 24,
            maxWidth: 390,
            width: '98vw',
            maxHeight: '95vh',
            overflowY: 'auto',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            padding: 0,
            position: 'relative',
            ...roundedFont
          }}>
            <button onClick={() => setShowModal(false)} style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'none',
              border: 'none',
              fontSize: 22,
              fontWeight: 700,
              cursor: 'pointer',
              color: '#333',
              zIndex: 2,
              borderRadius: 16,
              padding: '4px 16px',
              ...roundedFont
            }}>Cerrar</button>
            {modalTipo === 'subscripcion' && (
              <div style={{ padding: '28px 20px 20px 20px' }}>
                <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 18, letterSpacing: '-1px', ...roundedFont }}>INSCRIPCIÓN</h2>
                <div style={{ border: '3px solid #4ed6c4', borderRadius: 18, padding: 14, marginBottom: 22, background: '#f8fefc', ...roundedFont }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, letterSpacing: '-0.5px' }}>INFORMACIÓN DEL CONTRATO</div>
                  <div style={{ fontSize: 15, marginBottom: 10, lineHeight: 1.4 }}>
                    Tu suscripción se ampliará automáticamente cada <b>4 semanas</b>.<br />
                    Recuerda que puedes cancelar en cualquier momento con <b>4 semanas</b>.
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 2, fontWeight: 500 }}><span style={{ color: '#888' }}>Próximo pago</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>17-07-2025</span></div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, ...roundedFont }}>DETALLES DE AFILIACIÓN</div>
                <div style={{ fontSize: 15, marginBottom: 2 }}><span style={{ color: '#888' }}>Inscripción</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>COMFORT</span></div>
                <div style={{ fontSize: 15, marginBottom: 2 }}><span style={{ color: '#888' }}>Duración mínima</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>4 semanas</span></div>
                <div style={{ fontSize: 15, marginBottom: 2 }}><span style={{ color: '#888' }}>Fecha de inicio</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>30-1-2025</span></div>
                <div style={{ fontSize: 15, marginBottom: 2 }}><span style={{ color: '#888' }}>Cuota</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>24,99 € por 4 semanas</span></div>
                <div style={{ fontSize: 15, marginBottom: 16 }}><span style={{ color: '#888' }}>Número de socio</span> <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>D700244646</span></div>
                <div style={{ borderTop: '1px solid #eee', margin: '22px 0' }}></div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, ...roundedFont }}>CONTRATO DE ADHESIÓN</div>
                <div style={{ fontSize: 15, marginBottom: 22, color: '#222', lineHeight: 1.4 }}>
                  Actualmente, la opción de descargar el contrato de afiliación no está disponible en la aplicación. Por favor, vaya al navegador de su teléfono para descargar su contrato de afiliación.
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, ...roundedFont }}>INSCRIPCIÓN ACTUAL</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
                  <button style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', border: '1px solid #eee', borderRadius: 16, padding: '12px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', ...roundedFont
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span role="img" aria-label="cambiar">🔄</span> Cambiar inscripción
                    </span>
                    <span style={{ fontSize: 18 }}>{'>'}</span>
                  </button>
                  <button style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', border: '1px solid #eee', borderRadius: 16, padding: '12px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', color: '#ff9100', ...roundedFont
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span role="img" aria-label="baja">❌</span> Darme de baja
                    </span>
                    <span style={{ fontSize: 18 }}>{'>'}</span> 
                  </button>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, ...roundedFont }}>MIS AÑADIDOS</div>
                <div style={{ background: '#fff7e6', borderRadius: 16, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>BOLSA DE GIMNASIO</div>
                  <div style={{ fontSize: 14, marginBottom: 6, color: '#222' }}>Recibirás un mensaje cuando tu bolsa de deporte esté disponible en tu club.</div>
                  <div style={{ fontWeight: 700, color: '#7c3aed', fontSize: 16 }}>0,00 € <span style={{ fontWeight: 400, fontSize: 13 }}>/ una vez</span></div>
                  <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 12, padding: '8px 18px', fontWeight: 700, fontSize: 15, marginTop: 8, cursor: 'pointer', ...roundedFont }}>SOLICITAR</button>
                </div>
                <div style={{ background: '#e6f7f5', borderRadius: 16, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>YANGA SPORTS WATER</div>
                  <div style={{ fontSize: 14, marginBottom: 6, color: '#222' }}>Mejora tu hidratación y tus entrenamientos con YANGA Sports Water. Elige tu sabor favorito de entre los 6 disponibles. Son súper refrescantes.</div>
                  <div style={{ fontWeight: 700, color: '#333', fontSize: 16 }}>4,99 € <span style={{ fontWeight: 400, fontSize: 13 }}>/ 4 semanas</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <span>Activar</span>
                    <input type="checkbox" style={{ width: 18, height: 18 }} />
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, ...roundedFont }}>PREGUNTAS FRECUENTES</div>
                <div style={{ fontSize: 15, marginBottom: 4, color: '#222' }}><b>¿Tienes alguna pregunta? Estamos a tu disposición.</b></div>
                <div style={{ fontSize: 15, marginBottom: 2, color: '#222' }}>¿Cuál es la duración mínima de una tarifa?</div>
                <div style={{ fontSize: 15, marginBottom: 2, color: '#222' }}>¿Deseo cambiar de tarifa. ¿Cómo hacerlo?</div>
              </div>
            )}
            {modalTipo === 'pagos' && (
              <div style={{ padding: '28px 20px 20px 20px' }}>
                {/* Cabecera naranja */}
                <div style={{ background: 'linear-gradient(90deg, #ff9100 80%, #fff7e6 100%)', borderRadius: 16, padding: '18px 18px 12px 18px', marginBottom: 18 }}>
                  <div style={{ fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-1px', marginBottom: 6 }}>PAGOS</div>
                  <div style={{ color: '#fff', fontSize: 15, lineHeight: 1.4 }}>
                    Aquí encontrarás una vista previa de todas tus transacciones abiertas y completadas. Gym-fit pretende ser transparente siempre, por lo que de esta manera sabrás exactamente en qué situación de pago te encuentras. ¿Tienes alguna duda respecto a los pagos? Revisa la página FAQ para una respuesta rápida.
                  </div>
                </div>
                {/* Débitos futuros */}
                <div style={{ background: '#f6f6f6', borderRadius: 14, padding: '18px 18px 12px 18px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontWeight: 900, fontSize: 17, color: '#222', marginBottom: 8 }}>DÉBITOS FUTUROS</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize: 16, marginBottom: 2 }}>
                    <span>Cuota De Membresía</span>
                    <span style={{ color: '#ff9100' }}>-24,99 €</span>
                  </div>
                  <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Comfort 17-07 / 13-08 <span style={{ float: 'right', color: '#222', fontWeight: 700 }}>24,99 €</span></div>
                  <div style={{ color: '#222', fontSize: 15, marginBottom: 6 }}>Próximo periodo <b>Jueves 17-07</b></div>
                  <div style={{ color: '#ff9100', fontWeight: 900, fontSize: 15, marginTop: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Débitos futuros <span style={{ fontSize: 18 }}>→</span>
                  </div>
                </div>
                {/* Resumen de transacciones */}
                <div style={{ background: '#f6f6f6', borderRadius: 14, padding: '18px 14px 18px 14px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 44, color: '#ff9100', marginBottom: 2, lineHeight: 1 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44"><g><rect width="44" height="44" rx="12" fill="#fff7e6"/><path d="M13 24l6 6 12-12" stroke="#ff9100" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v2.5" stroke="#4ed6c4" strokeWidth="2.5" fill="none"/></g></svg>
                    </span>
                    <div style={{ fontWeight: 900, fontSize: 18, color: '#222', marginBottom: 2, textAlign: 'center' }}>¡Sí! TODO VA BIEN</div>
                  </div>
                  <div style={{ display: 'flex', fontWeight: 900, fontSize: 15, color: '#222', marginBottom: 8 }}>
                    <div style={{ flex: 2 }}>Descripción</div>
                    <div style={{ flex: 1, textAlign: 'right' }}>Transacciones</div>
                  </div>
                  {/* Fila 1 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Cuota de la Suscripción 19-06-2025/16-07-2025</div>
                      <div style={{ fontSize: 13, color: '#888' }}>19-06-2025</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, color: '#222', fontSize: 15 }}>-24,99 €</div>
                      <div style={{ color: '#ff9100', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Ver Factura</div>
                    </div>
                  </div>
                  {/* Fila 2 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Period: 19-06-2025 / 16-07-2025 (SEPA)</div>
                      <div style={{ fontSize: 13, color: '#888' }}>18-06-2025</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, color: '#fff', background: '#4ed6c4', borderRadius: 8, fontSize: 15, padding: '2px 14px', display: 'inline-block' }}>24,99 €</div>
                    </div>
                  </div>
                  {/* Fila 3 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Cuota de la Suscripción 22-05-2025/18-06-2025</div>
                      <div style={{ fontSize: 13, color: '#888' }}>22-05-2025</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, color: '#222', fontSize: 15 }}>-24,99 €</div>
                      <div style={{ color: '#ff9100', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Ver Factura</div>
                    </div>
                  </div>
                  {/* Fila 4 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Period: 22-05-2025 / 18-06-2025 (SEPA)</div>
                      <div style={{ fontSize: 13, color: '#888' }}>21-05-2025</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, color: '#fff', background: '#4ed6c4', borderRadius: 8, fontSize: 15, padding: '2px 14px', display: 'inline-block' }}>24,99 €</div>
                    </div>
                  </div>
                  {/* Mostrar pagos anteriores */}
                  {!mostrarPagosAnteriores && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10, cursor: 'pointer' }} onClick={() => setMostrarPagosAnteriores(true)}>
                      <span style={{ color: '#ff9100', fontWeight: 900, fontSize: 17, textDecoration: 'underline', textAlign: 'right', lineHeight: 1.1, marginRight: 8 }}>
                        MOSTRAR PAGOS<br/>ANTERIORES
                      </span>
                      <span style={{ color: '#ff9100', fontSize: 22, fontWeight: 900 }}>&rarr;</span>
                    </div>
                  )}
                  {mostrarPagosAnteriores && (
                    <>
                      {/* Más filas de ejemplo */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                        <div style={{ flex: 2 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Cuota de la Suscripción 20-04-2025/18-05-2025</div>
                          <div style={{ fontSize: 13, color: '#888' }}>20-04-2025</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                          <div style={{ fontWeight: 900, color: '#222', fontSize: 15 }}>-24,99 €</div>
                          <div style={{ color: '#ff9100', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Ver Factura</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '1px solid #e0e0e0', padding: '12px 0 4px 0' }}>
                        <div style={{ flex: 2 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>Period: 20-04-2025 / 18-05-2025 (SEPA)</div>
                          <div style={{ fontSize: 13, color: '#888' }}>19-04-2025</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                          <div style={{ fontWeight: 900, color: '#fff', background: '#4ed6c4', borderRadius: 8, fontSize: 15, padding: '2px 14px', display: 'inline-block' }}>24,99 €</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Advertencia */}
                <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <span style={{ color: '#ff9100', fontSize: 22, marginTop: 2 }}>ⓘ</span>
                  <div style={{ color: '#222', fontSize: 15, lineHeight: 1.4 }}>
                    Se necesita un DNI válido (o NIE para residentes extranjeros) para generar facturas válidas.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil; 