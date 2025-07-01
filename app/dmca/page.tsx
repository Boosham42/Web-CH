import Layout from '@/app/components/Layout';
import Head from 'next/head';

export default function AvisoLegalPage() {
  return (
    <Layout>
      <Head>
        <title>Aviso Legal - CH TV</title>
        <meta name="description" content="Aviso legal sobre el contenido de CH TV en homenaje a Chespirito." />
      </Head>

      <div className="py-8 px-6 max-w-4xl mx-auto text-justify animate-fade-in">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Aviso Legal</h1>

        <p className="mb-4">
          CH TV es un proyecto sin fines de lucro creado con el único objetivo de rendir homenaje a la obra y legado de
          <strong> Roberto Gómez Bolaños</strong>, también conocido como <strong>Chespirito</strong>. Valoramos profundamente
          su contribución al humor, la televisión y la cultura latinoamericana.
        </p>

        <p className="mb-4">
          En esta página <strong>no se aloja contenido audiovisual</strong> directamente. Todos los videos presentados se encuentran
          públicamente disponibles en plataformas de terceros como <em>Streamtape</em>, <em>Filemoon</em>, y otras. CH TV actúa
          únicamente como un índice organizado de enlaces para facilitar el acceso a estos materiales.
        </p>

        <p className="mb-4">
          Este proyecto busca <strong>preservar y difundir episodios que ya no se transmiten por televisión</strong>, muchos de los cuales
          podrían haber sido considerados <strong>lost media</strong> en algún momento. Creemos que es importante mantener viva esta parte
          de la historia televisiva y cultural, especialmente para nuevas generaciones.
        </p>

        <p className="mb-4">
          CH TV <strong>respeta plenamente la Digital Millennium Copyright Act (DMCA)</strong> y otras leyes de propiedad intelectual.
        </p>

        <p className="mb-4">
          CH TV no se responsabiliza por el contenido, disponibilidad ni legalidad de los videos alojados en sitios externos. El acceso a
          este sitio implica la aceptación de estas condiciones.
        </p>

        <p className="mt-6 italic text-sm text-gray-600">
          Este aviso legal puede ser actualizado en cualquier momento sin previo aviso.
        </p>
      </div>
    </Layout>
  );
}
