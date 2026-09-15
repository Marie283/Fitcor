import React from 'react';
import 'components/css/header.css';
import AvatarButton from 'components/avatar-button';

function Header({ onAvatarClick, foto }) {
  return (
    <header className="header">
      <div className="header-left">
        <AvatarButton onClick={onAvatarClick} foto={foto} />
      </div>
      <div className="header-center">
        <span className="logo">FITC<span role="img" aria-label="corazón blanco">🤍</span>R</span>
      </div>
      {/* Eliminar header-right con los iconos */}
    </header>
  );
}

export default Header; 