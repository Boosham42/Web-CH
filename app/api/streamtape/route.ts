import { NextRequest, NextResponse } from 'next/server';
import st from 'streamtape';

const USER = process.env.STREAMTAPE_USER!;
const PASS = process.env.STREAMTAPE_PASS!;

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get('url');
  if (!videoUrl) {
    return NextResponse.json({ status: 'error', error: 'URL faltante' });
  }

  try {
    const direct = await st.download(videoUrl, USER, PASS);
    return NextResponse.json({ status: 'ok', url: direct });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', error: 'No se pudo obtener el enlace directo desde Streamtape' });
  }
}

