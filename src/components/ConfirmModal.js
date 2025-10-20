import React from 'react';
import PropTypes from 'prop-types';

function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar",
  type = 'danger' // danger, warning, info
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        maxWidth: 350,
        width: '90vw',
        padding: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ 
          fontWeight: 900, 
          fontSize: 20, 
          marginBottom: 12, 
          color: '#222',
          textAlign: 'center'
        }}>
          {title}
        </h3>
        <p style={{ 
          color: '#666', 
          fontSize: 16, 
          marginBottom: 24,
          textAlign: 'center',
          lineHeight: 1.5
        }}>
          {message}
        </p>
        <div style={{ 
          display: 'flex', 
          gap: 12,
          justifyContent: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f5f5f5',
              color: '#666',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              flex: 1
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              background: type === 'danger' ? '#ff4d4d' : type === 'warning' ? '#ffa500' : '#4dabf7',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              flex: 1
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'warning', 'info'])
};

export default ConfirmModal;

