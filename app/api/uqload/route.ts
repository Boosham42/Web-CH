import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get('url');
  if (!videoUrl) {
    return NextResponse.json({ status: 'error', error: 'Missing url param' });
  }

  try {
    const response = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://uqload.cx/',
        'Accept': 'text/html',
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        status: 'error',
        error: `Uqload responded with status ${response.status}`,
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    let mp4Url = '';

    $('script[type="text/javascript"]').each((_, el) => {
      const scriptContent = $(el).html();
      if (scriptContent?.includes('sources:')) {
        const match = scriptContent.match(/sources\s*:\s*(\[[^\]]+\])/);
        if (match && match[1]) {
          try {
            const sources = JSON.parse(match[1]);
            mp4Url = sources[0]?.file || '';
          } catch (e) {
            console.error('❌ Error al parsear JSON:', e);
          }
        }
      }
    });

    if (mp4Url) {
      return NextResponse.json({ status: 'ok', url: mp4Url });
    } else {
      return NextResponse.json({ status: 'error', error: 'No video found' });
    }
  } catch (err: any) {
    console.error('❌ Error general:', err);
    return NextResponse.json({ status: 'error', error: err.message });
  }
}
