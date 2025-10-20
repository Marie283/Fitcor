import React from 'react';
import './BadgeBanner.css';

function BadgeBanner() {
  return (
    <div className="badge-banner">
      <div className="badge-icon">🚀</div>
      <div className="badge-content">
        <div className="badge-title">¡BOOM! ¡HAS GANADO UNA NUEVA INSIGNIA!</div>
        <div className="badge-desc">2 SEMANAS SEGUIDAS<br/>07/07/2025</div>
      </div>
      <div className="badge-share">⇪</div>
    </div>
  );
}

export default BadgeBanner; 