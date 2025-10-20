import React from 'react';
import './AvatarButton.css';

function AvatarButton({ onClick, foto }) {
  return (
    <button className="avatar-btn" onClick={onClick}>
      {foto ? (
        <img src={foto} alt="Foto de perfil" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <span className="avatar-icon">👤</span>
      )}
    </button>
  );
}

export default AvatarButton; 