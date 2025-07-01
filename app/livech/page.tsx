'use client';

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Layout from '@/app/components/Layout';
import '@/styles/LiveStream.css';
import '@/node_modules/plyr/dist/plyr.css';

const chavo = [
  { url: 'https://streamtape.com/v/j7xg8qD4mjFg36/Chavo_del_8_Sketch_2.mp4', direct: false },
  { url: 'https://cdn.example.com/chavo1.mp4', direct: true }
];

const chespirito = [
  { url: 'https://cdn.example.com/chespirito1.mp4', direct: true },
  { url: 'https://streamtape.com/v/abc123/Chespirito_Sketch.mp4', direct: false }
];

const comerciales = [
  { url: 'https://streamtape.com/v/JkOOdjwPwkij0X8/Comerciales_Colombianos.mp4', direct: false },
  { url: 'https://cdn.example.com/comercial2.mp4', direct: true }
];

const ahoraSigue = {
  chavo: { url: 'https://cdn.example.com/ahora_sigue_chavo.mp4', direct: true },
  chespirito: { url: 'https://cdn.example.com/ahora_sigue_chespirito.mp4', direct: true }
};

type VideoItem = { url: string; direct: boolean; tipo: 'chavo' | 'chespirito' | 'comercial' | 'ahora' };

export default function LiveStreamPage() {
  const [isClient, setIsClient] = useState(false);
  const [srcFinal, setSrcFinal] = useState('');
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const chavoCount = useRef(0);
  const chespiritoCount = useRef(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const shuffle = (arr: VideoItem[]) => [...arr].sort(() => Math.random() - 0.5);

    const initialQueue: VideoItem[] = shuffle([
      ...chavo.map(v => ({ ...v, tipo: 'chavo' as const })),
      ...chespirito.map(v => ({ ...v, tipo: 'chespirito' as const }))
    ]);
    setVideoQueue(initialQueue);
    setCurrentIndex(0);
  }, [isClient]);

  const cargarFuente = async (video: VideoItem) => {
    if (video.direct) {
      setSrcFinal(video.url);
      const el = document.getElementById('player') as HTMLVideoElement;
      if (el) {
        el.src = video.url;
        el.load();
        el.play().catch(err => console.warn('Autoplay falló:', err));
      }
    } else {
      try {
        const res = await fetch(`/api/streamtape?url=${encodeURIComponent(video.url)}`);
        const data = await res.json();
        if (!data.success && !data.url) {
          alert('Error obteniendo video de Streamtape: ' + data.error);
          return;
        }
        const urlFinal = data.playUrl || data.url;
        setSrcFinal(urlFinal);
        const el = document.getElementById('player') as HTMLVideoElement;
        if (el) {
          el.src = urlFinal;
          el.load();
          el.play().catch(err => console.warn('Autoplay falló:', err));
        }
      } catch (err) {
        alert('Error de red al contactar el backend.');
      }
    }
  };

  useEffect(() => {
    if (videoQueue.length > 0) {
      cargarFuente(videoQueue[currentIndex]);
    }
  }, [videoQueue, currentIndex]);

  useEffect(() => {
    if (!isClient) return;

    let player: any;

    const init = async () => {
      const Plyr = (await import('plyr')).default;
      player = new Plyr('#player', {
        autoplay: true,
        controls: ['pause', 'mute', 'volume', 'fullscreen'],
        tooltips: { controls: false },
        keyboard: { focused: false, global: false }
      });
      playerRef.current = player;

      player.on('ended', () => {
        const current = videoQueue[currentIndex];
        let nextQueue = [...videoQueue];

        if (current.tipo === 'chavo') {
          chavoCount.current++;
          if (chavoCount.current % 3 === 0) {
            const comercial = comerciales[Math.floor(Math.random() * comerciales.length)];
            const sigue = ahoraSigue['chavo'];
            nextQueue.splice(currentIndex + 1, 0, { ...comercial, tipo: 'comercial' }, { ...sigue, tipo: 'ahora' });
          }
        } else if (current.tipo === 'chespirito') {
          chespiritoCount.current++;
          if (chespiritoCount.current % 1 === 0) {
            const comercial = comerciales[Math.floor(Math.random() * comerciales.length)];
            const sigue = ahoraSigue['chespirito'];
            nextQueue.splice(currentIndex + 1, 0, { ...comercial, tipo: 'comercial' }, { ...sigue, tipo: 'ahora' });
          }
        }

        setVideoQueue(nextQueue);
        setCurrentIndex(prev => (prev + 1 >= nextQueue.length ? 0 : prev + 1));
      });
    };

    init();
  }, [isClient, videoQueue, currentIndex]);

  if (!isClient) return null;

  return (
    <Layout>
      <Head>
        <title>CH TV - En Vivo</title>
        <link rel="icon" href="/images/ch.png" type="image/png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" />
      </Head>

      <div className="py-6">
        <h2 className="page-title">Episodios de Roberto Gómez Bolaños en vivo</h2>
        <div className="video-container">
          <video
            id="player"
            className="vhs-effect"
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
