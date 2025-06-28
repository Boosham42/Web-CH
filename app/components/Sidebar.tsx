'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="w-72 min-w-[280px] bg-gradient-to-b from-green-800 to-green-600 text-white p-6 flex flex-col shadow-2xl z-50 overflow-y-auto overflow-x-auto max-w-full">
      {/* Logo Section */}
      <div className="items-center mb-8 min-w-0">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-30"></div>
          <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden flex-shrink-0">
            <Image
              src="/images/ch.png"
              alt="CH TV Logo"
              width={80}
              height={80}
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>
        <h2
          className="text-2xl text-yellow-300 text-center tracking-wide whitespace-nowrap"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          CH TV
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-3 mt-6 flex-grow min-w-0">
        {[
          { href: '/', icon: 'ri-home-2-line', label: 'Inicio' },
          { href: '/chtv', icon: 'ri-tv-line', label: 'Ver CH TV' },
          { href: '/temporadas', icon: 'ri-film-line', label: 'Temporadas' },
          { href: '/personajes', icon: 'ri-brush-line', label: 'Personajes' },
          { href: '/historia', icon: 'ri-book-open-line', label: 'Historia' },
          { href: '/canciones', icon: 'ri-music-line', label: 'Canciones' },
          { href: '/dialogos', icon: 'ri-chat-3-line', label: 'Frases' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center text-white no-underline p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:translate-x-2 group whitespace-nowrap min-w-0"
          >
            <i
              className={`${item.icon} mr-3 text-xl text-yellow-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
            ></i>
            <span className="font-medium truncate">{item.label}</span>
          </Link>
        ))}

        {/* Canal CH Link - Ahora está dentro del área visible */}
        <div className="border-t border-white/20 pt-4 mt-4">
          <a
            href="https://whatsapp.com/channel/CHTV"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white no-underline p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:translate-x-2 group whitespace-nowrap min-w-0"
          >
            <i className="ri-links-line mr-3 text-xl text-yellow-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"></i>
            <span className="font-medium truncate">Canal CH</span>
          </a>
        </div>
      </nav>
    </div>
  );
}