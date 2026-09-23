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
            backgroundColor: '#00E5FF', // bg-clay (Cyan)
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 3px 0 0 #0055FF', // shadow de clay-deep
          }}
        >
          <div
            style={{
              color: '#0A0F1C', // text-ink
              fontSize: 34,
              fontWeight: 900,
              fontFamily: 'sans-serif',
            }}
          >
            D
          </div>
          <div
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              backgroundColor: '#B026FF', // bg-ochre (Neon Purple)
              borderRadius: '4px',
              border: '2px solid #FFFFFF',
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