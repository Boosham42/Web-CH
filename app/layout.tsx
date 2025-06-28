import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const montserratBlack = Montserrat({
  subsets: ['latin'],
  weight: '900',
});

export const metadata: Metadata = {
  title: 'CH TV - El Canal de Chespirito',
  description:
    'Disfruta de las mejores series de Roberto Gómez Bolaños: El Chavo del 8, Chespirito y más.',
  keywords:
    'Chespirito, El Chavo del 8, Roberto Gómez Bolaños, series mexicanas, comedia',
  authors: [{ name: 'CH TV' }],
  icons: {
    icon: '/images/ch.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
