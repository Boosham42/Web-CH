'use client';

import { useEffect, useState, useRef } from 'react';
import 'plyr/dist/plyr.css';

export default function PruebaPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Extraer video desde API
  useEffect(() => {
    const fetchUqloadVideo = async () => {
      try {
        const res = await fetch(
          `/api/uqload?url=${encodeURIComponent('https://uqload.cx/4vb13czuaxkx.html')}`
        );
        const data = await res.json();
        if (data.status === 'ok') {
          setVideoUrl(data.url);
        } else {
          console.error('❌ Error del backend:', data.error);
          alert('Error al extraer video de Uqload');
        }
      } catch (err) {
        console.error('❌ Error de red:', err);
        alert('Error al contactar el servidor');
      }
    };

    fetchUqloadVideo();
  }, []);

  // Inicializar Plyr cuando el video esté listo
  useEffect(() => {
    if (videoUrl && typeof window !== 'undefined') {
      import('plyr').then(({ default: Plyr }) => {
        if (videoRef.current) {
          // Elimina instancia previa si ya existía (opcional)
          if ((videoRef.current as any).plyr) {
            (videoRef.current as any).plyr.destroy();
          }

          new Plyr(videoRef.current, {
            controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
          });
        }
      });
    }
  }, [videoUrl]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Prueba Uqload</h1>
      <video
        ref={videoRef}
        id="player"
        controls
        playsInline
        style={{ width: '100%', maxWidth: '800px', borderRadius: '12px' }}
      >
        {videoUrl && <source src={videoUrl} type="video/mp4" />}
      </video>
    </div>
  );
}
