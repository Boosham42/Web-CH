'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function TemporadasChavoPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const temporadas = [
    {
      id: 1,
      img: '/images/CH8/1.jpg',
      desc: 'Temporada 1 de 1971 a 1972 (Del programa Chespirito)',
      link: '/Temporadas/CH8/T1',
    },
    {
      id: 2,
      img: '/images/CH8/2.jpg',
      desc: 'Temporada 2 de 1973',
      link: '#',
    },
    {
      id: 3,
      img: '/images/CH8/3.jpg',
      desc: 'Temporada 3 de 1974',
      link: '#',
    },
    {
      id: 4,
      img: '/images/CH8/4.jpg',
      desc: 'Temporada 4 de 1975',
      link: '#',
    },
    {
      id: 5,
      img: '/images/CH8/5.jpg',
      desc: 'Temporada 5 de 1976',
      link: '#',
    },
    {
      id: 6,
      img: '/images/CH8/6.jpg',
      desc: 'Temporada 6 de 1977',
      link: '#',
    },
    {
      id: 7,
      img: '/images/CH8/7.jpg',
      desc: 'Temporada 7 de 1978',
      link: '#',
    },
    {
      id: 8,
      img: '/images/CH8/8.jpg',
      desc: 'Temporada 8 de 1979',
      link: '#',
    },
  ];

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
      <h2 className="text-3xl font-bold text-green-700 text-center mt-10 animate-slide-down">
        Temporadas de El Chavo del 8
      </h2>

      <section className="flex flex-wrap justify-center gap-8 p-8">
        {temporadas.map((temp) => (
          <div
            key={temp.id}
            className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 animate-zoom-in"
          >
            <Image
              src={temp.img}
              alt={`Temporada ${temp.id}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="text-center p-4">
              <h3 className="text-base font-semibold text-red-700 mb-2">
                {temp.desc}
              </h3>
              <Link href={temp.link}>
                <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                  Ver temporada
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
