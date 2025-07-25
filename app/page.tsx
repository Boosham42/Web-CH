'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from './components/Layout';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(8);
  const [navigationLoading, setNavigationLoading] = useState<boolean>(false);
  const [navigationProgress, setNavigationProgress] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [hasSeenLoading, setHasSeenLoading] = useState<boolean>(false);

  const series = [
    {
      id: 'chavodel8',
      title: 'El Chavo del 8',
      description: 'Las aventuras del Chavo y sus amigos en la vecindad.',
      image: '/images/El-Chavo-del-Ocho.jpg',
      href: '/Chavodel8',
    },
    {
      id: 'chespirito',
      title: 'Chespirito',
      description: 'Sketches cómicos de personajes como El Chapulín Colorado y más.',
      image: '/images/chespirito.jpeg',
      href: '/Chespirito',
    },
  ];

  const filteredSeries = series.filter((serie) =>
    serie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    serie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const imageSources: string[] = series.map((s) => s.image).concat(['/images/ch.png']);

  useEffect(() => {
    setIsClient(true);
    // Cambiar a sessionStorage para que se borre al cerrar la pestaña
    const hasSeenLoadingValue = sessionStorage?.getItem('hasSeenCHTVLoading');
    setHasSeenLoading(!!hasSeenLoadingValue);
  }, []);

  const preloadPageResources = async (href: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    try {
      const imagesToPreload: string[] = [
        '/images/El-Chavo-del-Ocho.jpg',
        '/images/chespirito.jpeg',
        '/images/ch.png',
      ];

      const preloadImage = (src: string): Promise<string> => {
        return new Promise((resolve) => {
          if (typeof window === 'undefined') {
            resolve(src);
            return;
          }

          const img = document.createElement('img');
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src);
          img.src = src;
        });
      };

      const preloadHTML = fetch(href).then((response) => response.text()).catch(() => null);
      const imagePromises = imagesToPreload.map(preloadImage);
      await Promise.allSettled([preloadHTML, ...imagePromises]);

      return true;
    } catch (error) {
      console.log('Error en precarga:', error);
      return false;
    }
  };

  const handleNavigation = async (href: string): Promise<void> => {
    setNavigationLoading(true);
    setNavigationProgress(0);

    let preloadComplete = false;
    let progressComplete = false;

    const preloadPromise = preloadPageResources(href).then(() => {
      preloadComplete = true;
      return true;
    });

    const progressInterval = setInterval(() => {
      setNavigationProgress((prev) => {
        if (prev >= 85) {
          if (preloadComplete && prev >= 95) {
            clearInterval(progressInterval);
            progressComplete = true;
            setNavigationProgress(100);

            setTimeout(() => {
              window.location.href = href;
            }, 150);

            return 100;
          }
          return prev + Math.random() * 2;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    setTimeout(() => {
      if (!progressComplete) {
        clearInterval(progressInterval);
        setNavigationProgress(100);
        setTimeout(() => {
          window.location.href = href;
        }, 150);
      }
    }, 4000);

    preloadPromise.then(() => {
      setTimeout(() => {
        if (navigationProgress < 90) {
          const fastInterval = setInterval(() => {
            setNavigationProgress((prev) => {
              if (prev >= 100) {
                clearInterval(fastInterval);
                clearInterval(progressInterval);
                setTimeout(() => {
                  window.location.href = href;
                }, 150);
                return 100;
              }
              return prev + 8;
            });
          }, 50);
        }
      }, 800);
    });
  };

  useEffect(() => {
    if (!isClient) return;

    if (hasSeenLoading) {
      setLoading(false);
      setImagesLoaded(true);

      setTimeout(() => {
        if (typeof window !== 'undefined') {
          series.forEach((serie) => {
            fetch(serie.href).catch(() => {});
            const img = document.createElement('img');
            img.src = serie.image;
          });
        }
      }, 1000);

      return;
    }

    let loadedCount = 0;
    let loadingComplete = false;

    if (typeof window !== 'undefined') {
      imageSources.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageSources.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === imageSources.length) {
            setImagesLoaded(true);
          }
        };
      });
    } else {
      setImagesLoaded(true);
    }

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          if (!loadingComplete) {
            loadingComplete = true;
            setLoading(false);
            if (typeof window !== 'undefined') {
              // Cambiar a sessionStorage para que se borre al cerrar la pestaña
              sessionStorage?.setItem('hasSeenCHTVLoading', 'true');
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      if (!loadingComplete) {
        loadingComplete = true;
        setLoading(false);
        if (typeof window !== 'undefined') {
          // Cambiar a sessionStorage para que se borre al cerrar la pestaña
          sessionStorage?.setItem('hasSeenCHTVLoading', 'true');
        }
      }
    }, 8000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timeout);
    };
  }, [isClient, hasSeenLoading]);

  // Loading inicial antes de hidratación
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
        <div className="text-center">
          <div className="text-4xl font-black text-red-600 mb-4">CH TV</div>
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Pantalla de carga inicial (solo primera vez por pestaña)
  if (loading && !hasSeenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 relative overflow-hidden">
        {/* Orbes decorativos */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-40 animate-float"></div>
        <div className="absolute bottom-24 right-16 w-24 h-24 bg-orange-300 rounded-full opacity-30 animate-float-delayed"></div>

        {/* Contador */}
        <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20 border-2 border-red-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-red-700 text-lg">{countdown}s</span>
          </div>
        </div>

        {/* Cuadro principal */}
        <div className="bg-white/70 backdrop-blur-md px-10 py-12 rounded-3xl shadow-2xl border border-red-200 animate-zoom-entrance text-center space-y-6 z-10 max-w-md">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text animate-bounce-slow">
            Bienvenido a CH TV
          </h1>
          <p className="text-lg text-red-800 font-medium">
            Cargando contenido increíble...
          </p>

          <div className="flex justify-center">
            <img
              src="/images/ch.png"
              alt="CH TV Logo"
              className="w-24 h-24 animate-spin-bounce"
            />
          </div>

          <div className="space-y-3">
            <div className="w-full h-2 bg-red-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-red-400 to-orange-400 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((8 - countdown) / 8) * 100}%` }}
              ></div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold text-red-700">
                  {countdown}
                </span>
                <span className="text-sm text-red-600 font-medium">
                  segundo{countdown !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-red-600 font-medium">
            {!imagesLoaded ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <span className="ml-2">Cargando recursos...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <span>✅ ¡Listo para continuar!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Página principal con Layout
  return (
    <Layout>
      {/* Barra de carga tipo YouTube */}
      {navigationLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-red-300 via-red-400 to-red-500 shadow-sm transition-all duration-300 ease-out"
            style={{
              width: `${navigationProgress}%`,
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
            }}
          ></div>
        </div>
      )}

      <div className="py-6 animate-zoom-entrance">
        {/* Barra de búsqueda */}
        <div className="flex justify-center my-8 animate-slide-down">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="🔍 Buscar series o episodios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-green-500 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-600 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            )}
          </div>
        </div>

        {/* Tarjetas de series */}
        <section className="max-w-full mx-auto">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 justify-items-center transition-all duration-300 ease-out grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredSeries.map((serie, index) => (
              <div
                key={serie.id}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-zoom-in"
                onMouseEnter={() => {
                  if (!navigationLoading && typeof window !== 'undefined') {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = serie.href;
                    document.head.appendChild(link);

                    const img = document.createElement('img');
                    img.src = serie.image;
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={serie.image}
                    alt={serie.title}
                    width={400}
                    height={250}
                    className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={true}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {serie.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                    {serie.description}
                  </p>
                  <button
                    onClick={() => handleNavigation(serie.href)}
                    disabled={navigationLoading}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-none px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                  >
                    {navigationLoading ? 'Cargando...' : 'Ver serie'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sin resultados */}
        {filteredSeries.length === 0 && searchTerm && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Orbes decorativos */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-red-300 rounded-full animate-float opacity-60 pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400 rounded-full animate-float-delayed opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-16 right-16 w-5 h-5 bg-orange-300 rounded-full animate-float-delayed opacity-30 pointer-events-none"></div>
    </Layout>
  );
}