'use client';

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Layout from '@/app/components/Layout';
import '@/styles/LiveStream.css';
import '@/node_modules/plyr/dist/plyr.css';

export default function LiveStreamPage() {
  const [isClient, setIsClient] = useState(false);
  const [srcFinal, setSrcFinal] = useState('');
  const [videoQueue, setVideoQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef<any>(null);

  const videos = [
    'https://streamtape.com/v/j7xg8qD4mjFg36/Chavo_del_8_Sketch_2.mp4',
    'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
    'https://streamtape.com/v/JkOOdjwPwkij0X8/Comerciales_Colombianos.mp4',
    'https://streamtape.com/v/GXBYb7a01vImV2/Comerciales_Colombianos_emitidos_A%C3%B1o_1990.mp4'
  ];

  useEffect(() => {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setVideoQueue(shuffled);
    setCurrentIndex(0);
  }, []);

  const cargarFuente = async (url: string) => {
    try {
      const res = await fetch(`/api/streamtape?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.status === 'ok') {
        setSrcFinal(data.url);
        const video = document.getElementById('player') as HTMLVideoElement;
        if (video) {
          video.src = data.url;
          video.load();
          video.play().catch(err => {
            console.warn('Autoplay falló:', err);
          });
        }
      } else {
        alert('Error al cargar desde Streamtape: ' + data.error);
      }
    } catch (err) {
      alert('Error de red al contactar el backend.');
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (videoQueue.length > 0) {
      cargarFuente(videoQueue[currentIndex]);
    }
  }, [videoQueue, currentIndex]);

  useEffect(() => {
    if (!isClient) return;

    import('plyr').then(({ default: Plyr }) => {
      const player = new Plyr('#player', {
        autoplay: true,
        controls: ['mute', 'volume', 'fullscreen'],
        tooltips: { controls: false },
      });
      playerRef.current = player;

      const style = document.createElement('style');
      style.innerHTML = `
        .plyr__progress,
        .plyr__menu,
        .plyr__controls button[data-plyr="play"] {
          display: none !important;
        }
        .plyr__time--current {
          display: none !important;
        }
        .plyr__volume {
          width: 100px !important;
        }
        .plyr__controls {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .en-vivo-label {
          position: absolute;
          top: 10px;
          left: 12px;
          background: red;
          color: white;
          padding: 2px 6px;
          font-size: 12px;
          border-radius: 4px;
          font-weight: bold;
          z-index: 9999;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .en-vivo-label.hidden {
          opacity: 0;
        }
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background-image: url('/images/ch.png');
          background-size: cover;
          border-radius: 9999px;
          animation: spin 1s linear infinite;
          z-index: 9999;
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      const enVivo = document.createElement('div');
      enVivo.className = 'en-vivo-label';
      enVivo.textContent = 'EN VIVO';

      const spinner = document.createElement('div');
      spinner.className = 'loading-spinner';

      const container = document.querySelector('.plyr');
      if (container && !container.querySelector('.en-vivo-label')) {
        container.appendChild(enVivo);
      }
      if (container && !container.querySelector('.loading-spinner')) {
        container.appendChild(spinner);
      }

      const showEnVivo = () => enVivo.classList.remove('hidden');
      const hideEnVivo = () => enVivo.classList.add('hidden');

      player.on('play', hideEnVivo);
      player.on('pause', showEnVivo);

      container?.addEventListener('mouseenter', showEnVivo);
      container?.addEventListener('mouseleave', hideEnVivo);

      player.on('playing', () => {
        if (spinner.parentElement) spinner.remove();
      });

      player.on('waiting', () => {
        if (!document.querySelector('.loading-spinner')) {
          container?.appendChild(spinner);
        }
      });

      player.on('ended', () => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= videoQueue.length) {
            const reshuffled = [...videos].sort(() => Math.random() - 0.5);
            setVideoQueue(reshuffled);
            return 0;
          }
          return next;
        });
      });

      return () => {
        if (player.destroy) player.destroy();
        container?.removeEventListener('mouseenter', showEnVivo);
        container?.removeEventListener('mouseleave', hideEnVivo);
      };
    });
  }, [isClient]);

  if (!isClient) return null;

  return (
    <Layout>
      <Head>
        <title>CH TV - En Vivo</title>
        <link rel="icon" href="/images/ch.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        />
      </Head>

      <div className="py-6">
        <h2 className="page-title">Episodios de Roberto Gómez Bolaños en vivo</h2>
        <div className="video-container">
          <video
            id="player"
            playsInline
            autoPlay
            controls
            crossOrigin="anonymous"
          >
            {srcFinal && <source src={srcFinal} type="video/mp4" />}
          </video>
        </div>

        <div className="acciones rounded-box">
          <button className="btn-like">
            <i className="ri-thumb-up-line"></i> Me gusta
          </button>
          <button className="btn-share">
            <i className="ri-share-forward-line"></i> Compartir
          </button>
        </div>
      </div>
    </Layout>
  );
}

