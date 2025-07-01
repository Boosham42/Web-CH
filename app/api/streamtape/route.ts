import { NextRequest, NextResponse } from 'next/server';
import { download } from '@/lib/streamtape';

const USER = process.env.STREAMTAPE_USER!;
const PASS = process.env.STREAMTAPE_PASS!;

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ success: false, error: 'URL faltante' });
  }

  console.log('🔎 Streamtape URL recibida:', videoUrl);
  console.log('👤 Usuario:', USER);
  console.log('🔐 Contraseña:', PASS);

  try {
    const direct = await download(videoUrl, USER, PASS);
    console.log('📦 Respuesta de streamtape.download:', direct);

    return NextResponse.json({ success: true, playUrl: direct.url });
  } catch (error: any) {
    console.error('❌ Error durante la descarga de Streamtape:', error);

    return NextResponse.json({
      success: false,
      error: error?.message || 'No se pudo obtener el enlace directo desde Streamtape',
    });
  }
}

