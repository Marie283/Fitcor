import React from 'react';
import PropTypes from 'prop-types';
import 'components/css/confirm-modal.css';

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
    <div className="confirm-overlay" onClick={onClose}>
      <div className="confirm-box" onClick={e => e.stopPropagation()}>
        <h3 className="confirm-title">
          {title}
        </h3>
        <p className="confirm-message">
          {message}
        </p>
        <div className="confirm-actions">
          <button
            onClick={onClose}
            className="confirm-btn-cancel"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`confirm-btn-confirm confirm-btn-confirm--${type}`}
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
