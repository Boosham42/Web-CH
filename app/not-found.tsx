'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // If autoplay fails, wait for user interaction
          const resumeAudio = () => {
            if (audioRef.current) {
              audioRef.current.play();
            }
            document.removeEventListener('click', resumeAudio);
          };
          document.addEventListener('click', resumeAudio);
        });
      }
    };

    playAudio();
  }, []);

  return (
    <div
      data-page="not-found"
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center overflow-hidden"
    >
      <audio ref={audioRef} preload="auto">
        <source src="/404/404.mp3" type="audio/mpeg" />
        Tu navegador no soporta el audio.
      </audio>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Image Container */}
          <div className="flex-1 text-center animate-slide-left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://i.imgur.com/i1a1iI6.png"
                alt="¡Fue sin querer queriendo!"
                className="relative w-full max-w-md mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Text Container */}
          <div className="flex-1 text-center lg:text-left animate-slide-right">
            <div className="space-y-6">
              <h1 className="text-8xl lg:text-9xl font-black text-transparent bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text animate-bounce-slow leading-none">
                404
              </h1>

              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                  Fue sin querer queriendo...
                </p>
                <p className="text-lg lg:text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
                  Pero esta página fue movida o no existe.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out group"
                >
                  <span>Volver a CH-TV</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-red-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-orange-400 rounded-full animate-float-delayed opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-float opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-red-300 rounded-full animate-float-delayed opacity-30"></div>
      </div>
    </div>
  );
}
