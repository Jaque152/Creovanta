import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#F43F5E', // bg-clay (Coral Vibrante para Marketing)
            borderRadius: '16px', // Curvas más suaves
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 4px 15px rgba(244, 63, 94, 0.4)', // Sombra difuminada
          }}
        >
          <div
            style={{
              color: '#FFFFFF', // Texto en blanco para alto contraste
              fontSize: 34,
              fontWeight: 900,
              fontFamily: 'sans-serif',
            }}
          >
            C
          </div>
          <div
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              backgroundColor: '#8B5CF6', // bg-ochre (Púrpura Creativo)
              borderRadius: '6px',
              border: '2px solid #0F172A', // Borde oscuro para resaltar
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}