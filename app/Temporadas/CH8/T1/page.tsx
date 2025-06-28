'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/app/components/Layout';
import '@/styles/episodios.css';
import '@/node_modules/plyr/dist/plyr.css';

export default function EpisodiosPage() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [countdown, setCountdown] = useState(8);

  const episodios = [
    {
      titulo: 'Cap. 01 - El Ropavejero',
      img: 'https://img-place.com/t5oxo2bq5lk7_t.jpg',
      opciones: [
        {
          label: 'Opción 1',
          src: 'https://861138102.tapecontent.net/radosgw/MrXbVp1AxYh1Dr/RTUUNE4zpTWSD2LlFF8bmiRWvUOO3VNDvbKh3gP8jajCfqISF6gb6PyYFUdDiIIm7tZKB1GzLlmtfkWA6xWqVDo_6yw8XFmcl0WcT7h4vRE48kVqkobmoYcsJSr5r5Lpls10aWCVf9Q2Qvql5sw5YZjK3zymtv_pB1KiigLkMniw9Z8iNB-TzCspQNkFcS5SGruPLZ58VMUQpSdZRGie6ENhq_UIPYX3mV2k0V0guxBxeihE7vwt-h6GC4OL1RBKucK35i2XnkPxKc40i1ijWQ9vTOdTfz_30Gr3Xg/Chavo+del+8+Sketch+1.mp4?stream=1',
          page: 'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
          tipo: ''
        },
        {
          label: 'Opción 2',
          src: 'https://filemoon.to/e/t5oxo2bq5lk7/Chavo_del_8_Sketch_1.',
          page: '',
          tipo: 'iframe'
        }
      ]
    },
    {
      titulo: 'Cap. 02 - El Ropavejero',
      img: 'https://fastly.picsum.photos/id/770/1024/768.jpg?hmac=NEvY_uKxsfAAo0ZafAA4qGfydOmAG1NHYQ6oyuo7soU',
      opciones: [
        {
          label: 'Opción 1',
          src: 'https://861138102.tapecontent.net/radosgw/MrXbVp1AxYh1Dr/RTUUNE4zpTWSD2LlFF8bmiRWvUOO3VNDvbKh3gP8jajCfqISF6gb6PyYFUdDiIIm7tZKB1GzLlmtfkWA6xWqVDo_6yw8XFmcl0WcT7h4vRE48kVqkobmoYcsJSr5r5Lpls10aWCVf9Q2Qvql5sw5YZjK3zymtv_pB1KiigLkMniw9Z8iNB-TzCspQNkFcS5SGruPLZ58VMUQpSdZRGie6ENhq_UIPYX3mV2k0V0guxBxeihE7vwt-h6GC4OL1RBKucK35i2XnkPxKc40i1ijWQ9vTOdTfz_30Gr3Xg/Chavo+del+8+Sketch+1.mp4?stream=1',
          page: 'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
          tipo: ''
        },
        {
          label: 'Opción 2',
          src: 'https://filemoon.to/e/t5oxo2bq5lk7/Chavo_del_8_Sketch_1.',
          page: '',
          tipo: 'iframe'
        }
      ]
    },
    {
      titulo: 'Cap. 03 - El Ropavejero',
      img: 'https://fastly.picsum.photos/id/168/1024/768.jpg?hmac=9OPgr8AMH-zCrVcGRPLJUq6pBUKonj4fi2jpcZ5ZLeU',
      opciones: [
        {
          label: 'Opción 1',
          src: 'https://861138102.tapecontent.net/radosgw/MrXbVp1AxYh1Dr/RTUUNE4zpTWSD2LlFF8bmiRWvUOO3VNDvbKh3gP8jajCfqISF6gb6PyYFUdDiIIm7tZKB1GzLlmtfkWA6xWqVDo_6yw8XFmcl0WcT7h4vRE48kVqkobmoYcsJSr5r5Lpls10aWCVf9Q2Qvql5sw5YZjK3zymtv_pB1KiigLkMniw9Z8iNB-TzCspQNkFcS5SGruPLZ58VMUQpSdZRGie6ENhq_UIPYX3mV2k0V0guxBxeihE7vwt-h6GC4OL1RBKucK35i2XnkPxKc40i1ijWQ9vTOdTfz_30Gr3Xg/Chavo+del+8+Sketch+1.mp4?stream=1',
          page: 'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
          tipo: ''
        },
        {
          label: 'Opción 2',
          src: 'https://filemoon.to/e/t5oxo2bq5lk7/Chavo_del_8_Sketch_1.',
          page: '',
          tipo: 'iframe'
        }
      ]
    },
    {
      titulo: 'Cap. 04 - El Ropavejero',
      img: 'https://fastly.picsum.photos/id/313/1024/768.jpg?hmac=P2bQfhZp5EVCMT4V_RdUl5JAMuLWr8huHMpZ6htIc8s',
      opciones: [
        {
          label: 'Opción 1',
          src: 'https://861138102.tapecontent.net/radosgw/MrXbVp1AxYh1Dr/RTUUNE4zpTWSD2LlFF8bmiRWvUOO3VNDvbKh3gP8jajCfqISF6gb6PyYFUdDiIIm7tZKB1GzLlmtfkWA6xWqVDo_6yw8XFmcl0WcT7h4vRE48kVqkobmoYcsJSr5r5Lpls10aWCVf9Q2Qvql5sw5YZjK3zymtv_pB1KiigLkMniw9Z8iNB-TzCspQNkFcS5SGruPLZ58VMUQpSdZRGie6ENhq_UIPYX3mV2k0V0guxBxeihE7vwt-h6GC4OL1RBKucK35i2XnkPxKc40i1ijWQ9vTOdTfz_30Gr3Xg/Chavo+del+8+Sketch+1.mp4?stream=1',
          page: 'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
          tipo: ''
        },
        {
          label: 'Opción 2',
          src: 'https://filemoon.to/e/t5oxo2bq5lk7/Chavo_del_8_Sketch_1.',
          page: '',
          tipo: 'iframe'
        }
      ]
    },
    {
      titulo: 'Cap. 05 - El Ropavejero',
      img: 'https://fastly.picsum.photos/id/575/1024/768.jpg?hmac=daUS67097jT9DYmejRfe7e5LaWF3MGuatQYnsmbic7c',
      opciones: [
        {
          label: 'Opción 1',
          src: 'https://861138102.tapecontent.net/radosgw/MrXbVp1AxYh1Dr/RTUUNE4zpTWSD2LlFF8bmiRWvUOO3VNDvbKh3gP8jajCfqISF6gb6PyYFUdDiIIm7tZKB1GzLlmtfkWA6xWqVDo_6yw8XFmcl0WcT7h4vRE48kVqkobmoYcsJSr5r5Lpls10aWCVf9Q2Qvql5sw5YZjK3zymtv_pB1KiigLkMniw9Z8iNB-TzCspQNkFcS5SGruPLZ58VMUQpSdZRGie6ENhq_UIPYX3mV2k0V0guxBxeihE7vwt-h6GC4OL1RBKucK35i2XnkPxKc40i1ijWQ9vTOdTfz_30Gr3Xg/Chavo+del+8+Sketch+1.mp4?stream=1',
          page: 'https://streamtape.com/v/MrXbVp1AxYh1Dr/Chavo_del_8_Sketch_1.mp4',
          tipo: ''
        },
        {
          label: 'Opción 2',
          src: 'https://filemoon.to/e/t5oxo2bq5lk7/Chavo_del_8_Sketch_1.',
          page: '',
          tipo: 'iframe'
        }
      ]
    }
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Manejo del loading usando localStorage en lugar de sessionStorage para evitar problemas de hidratación
    const hasSeen = localStorage?.getItem('hasSeenCHTVLoading');
    if (hasSeen) {
      setLoading(false);
    } else {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setLoading(false);
            localStorage?.setItem('hasSeenCHTVLoading', 'true');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!isClient || loading) return;

    import('plyr').then(({ default: Plyr }) => {
      const player = new Plyr('#player');
      const iframe = document.getElementById('embed-frame') as HTMLIFrameElement;
      const advertencia = document.getElementById('advertencia') as HTMLElement;
      const seguirBtn = document.getElementById('seguirBtn') as HTMLButtonElement;
      let currentVideoURL = "https://fastly.picsum.photos/id/575/1024/768.jpg?hmac=daUS67097jT9DYmejRfe7e5LaWF3MGuatQYnsmbic7c";

      function insertarBotonLink() {
        const anterior = document.querySelector('.custom-link-btn');
        if (anterior) anterior.remove();

        const linkBtn = document.createElement('button');
        linkBtn.classList.add('plyr__control', 'custom-link-btn');
        linkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"/>
            <path d="M5 5h9v2H7v9h9v-7h2v9H5V5z"/></svg>`;
        linkBtn.title = "Ver en sitio original";
        linkBtn.onclick = () => window.open(currentVideoURL, '_blank');

        const controles = document.querySelector('.plyr__controls');
        if (controles) controles.appendChild(linkBtn);
      }

      player.once('ready', insertarBotonLink);

      const handleButtonClick = (btn: HTMLButtonElement) => {
        const src = btn.getAttribute('data-src') || '';
        const page = btn.getAttribute('data-page') || src;
        const esIframe = btn.getAttribute('data-tipo') === 'iframe';
        currentVideoURL = page;

        if (esIframe && iframe && advertencia && seguirBtn) {
          player.pause();
          player.stop();
          const container = player.elements?.container;
          if (container) {
            container.style.display = 'none';
          }
          iframe.style.display = 'none';
          iframe.src = '';
          advertencia.style.display = 'block';
          seguirBtn.onclick = () => {
            advertencia.style.display = 'none';
            iframe.src = src;
            iframe.style.display = 'block';
          };
        } else {
          if (iframe) {
            iframe.style.display = 'none';
            iframe.src = '';
          }
          if (advertencia) {
            advertencia.style.display = 'none';
          }
          if (player.elements?.container) {
            player.elements.container.style.removeProperty('display');
          }
          player.source = {
            type: 'video',
            sources: [{ src, type: 'video/mp4' }]
          };
          setTimeout(insertarBotonLink, 300);
          player.play();
        }
      };

      const buttons = document.querySelectorAll<HTMLButtonElement>('.episodio button');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => handleButtonClick(btn));
      });

      // Cleanup function
      return () => {
        buttons.forEach(btn => {
          btn.removeEventListener('click', () => handleButtonClick(btn));
        });
        if (player.destroy) {
          player.destroy();
        }
      };
    });
  }, [isClient, loading]);

  if (!isClient) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-green-100 to-orange-100">
      <div className="text-center">
        <div className="text-4xl font-black text-green-600 mb-4">CH TV</div>
        <div className="w-8 h-8 border-4 border-yellow-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}


  return (
    <Layout>
      <Head>
        <title>CH TV - Episodios</title>
        <link rel="icon" href="/images/ch.png" type="image/png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" />
      </Head>

      <div className="py-6">
        <h2 className="page-title">Episodios de la Temporada 1</h2>
        <div className="video-container">
          <video id="player" controls crossOrigin="anonymous" playsInline></video>
          <iframe id="embed-frame" allowFullScreen></iframe>
          <div id="advertencia">
            🚫 ¡Advertencia importante!<br />Nuestra página NO tiene ni tendrá anuncios propios.<br />Este video proviene de una fuente externa fuera de nuestro control.<br /><br />🔒 Usa AdBlock para una mejor experiencia.<br />⚠️ Si decides continuar sin AdBlock, es bajo tu responsabilidad.<br /><br />
            <button id="seguirBtn">Seguir</button>
          </div>
        </div>
        <div className="episodio-lista">
          {episodios.map((ep, i) => (
            <div
              key={i}
              className="episodio seleccionado"
              style={{ backgroundImage: `url('${ep.img}')` }}
            >
              <span>{ep.titulo}</span>
              {ep.opciones.map((opt, j) => (
                <button
                  key={j}
                  data-src={opt.src}
                  data-page={opt.page}
                  data-tipo={opt.tipo}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Elementos flotantes decorativos */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-red-300 rounded-full animate-float opacity-60 pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400 rounded-full animate-float-delayed opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-16 right-16 w-5 h-5 bg-orange-300 rounded-full animate-float-delayed opacity-30 pointer-events-none"></div>
    </Layout>
  );
}
