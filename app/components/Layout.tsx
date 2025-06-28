'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header móvil */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-green-800 text-white flex items-center px-4 py-3 shadow-md">
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="text-white mr-4 text-2xl"
        >
          ☰
        </button>
        <Image src="/images/ch.png" alt="CH TV Logo" width={32} height={32} className="rounded mr-2" />
        <span className="font-bold text-lg">CH TV</span>
      </header>

      {/* Contenedor principal */}
      <div className="flex pt-16 lg:pt-0 min-h-screen">
        {/* Sidebar con scroll propio */}
        <div
          className={`
            w-72 bg-white z-30 shadow-xl overflow-y-auto h-screen
            transition-transform duration-300 ease-in-out
            ${windowSize.width >= 1024 ? 'sticky top-0 self-start' : 'fixed top-0 left-0'}
            ${windowSize.width >= 1024 || sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay para móvil */}
        {sidebarVisible && windowSize.width < 1024 && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarVisible(false)}
          />
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white text-center py-6 shadow-2xl mt-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <i className="ri-heart-fill text-red-400"></i>
              <span className="font-medium">© 2025 CH TV</span>
              <i className="ri-heart-fill text-red-400"></i>
            </div>
            <p className="text-green-200 text-sm">
              Inspirado en el legado de Roberto Gómez Bolaños
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
