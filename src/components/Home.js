import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PropTypes from 'prop-types';
import BadgeBanner from './BadgeBanner';
import WeekVisits from './WeekVisits';
import FeaturedWorkout from './FeaturedWorkout';
import CoachTips from './CoachTips';
import BenefitsBanner from './BenefitsBanner';

const Home = ({ onVerVisitas, onVerTodo, onAvatarClick }) => {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="main-content">
      <BadgeBanner />
      <WeekVisits onVerVisitas={onVerVisitas} />
      <FeaturedWorkout onVerTodo={onVerTodo} />
      <CoachTips />
      
      {/* Banner de acceso tipo SynergyFit, Basic-Fit, etc. */}
      <div style={{ width: '100%', margin: '24px 0' }}>
        <button
          className="acceso-banner"
          style={{
            width: '100%',
            background: '#6C2BD7',
            border: 'none',
            borderRadius: 8,
            padding: '18px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          onClick={() => setShowQRModal(true)}
          aria-label="Acceso QR"
        >
          <QRCodeSVG
            value={'FITCOR-D700244646'}
            size={32}
            bgColor="#6C2BD7"
            fgColor="#fff"
            level="H"
            includeMargin={false}
          />
          <span style={{ color: 'white', fontWeight: 900, fontSize: 28, letterSpacing: 1 }}>
            ACCESO
          </span>
        </button>
      </div>

      {/* Modal QR */}
      {showQRModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} 
          onClick={() => setShowQRModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)'
            }} 
            onClick={e => e.stopPropagation()}
          >
            <QRCodeSVG
              value={'FITCOR-D700244646'}
              size={180}
              bgColor="#ffffff"
              fgColor="#6C2BD7"
              level="H"
              includeMargin={false}
              style={{ marginBottom: 24 }}
            />
            <div style={{ fontWeight: 900, fontSize: 24, color: '#6C2BD7', marginBottom: 8 }}>
              FITCOR
            </div>
            <div style={{ fontSize: 16, color: '#888' }}>
              MemberID: D700244646
            </div>
            <button 
              onClick={() => setShowQRModal(false)} 
              style={{ 
                marginTop: 24, 
                background: '#6C2BD7', 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                padding: '10px 32px', 
                fontWeight: 700, 
                fontSize: 16, 
                cursor: 'pointer' 
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      <BenefitsBanner />
    </div>
  );
};

Home.propTypes = {
  onVerVisitas: PropTypes.func.isRequired,
  onVerTodo: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired
};

export default Home;