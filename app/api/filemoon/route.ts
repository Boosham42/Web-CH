import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://filemoonapi.com/api/';
const API_KEY = process.env.FILEMOON_API_KEY;

if (!API_KEY) {
  throw new Error('Falta FILEMOON_API_KEY en el entorno.');
}

// Función para construir URL con parámetros dinámicos
const buildUrl = (endpoint: string, params: Record<string, string | undefined>) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('key', API_KEY!);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  return url.toString();
};

export async function GET(req: NextRequest) {
  const method = req.nextUrl.searchParams.get('method');
  const file_code = req.nextUrl.searchParams.get('file_code') || undefined;
  const last = req.nextUrl.searchParams.get('last') || undefined;

  if (!method) {
    return NextResponse.json({ status: 'error', error: 'Missing method' }, { status: 400 });
  }

  let endpoint = '';
  let params: Record<string, string | undefined> = {};

  switch (method) {
    case 'info':
      endpoint = 'account/info';
      break;
    case 'stats':
      endpoint = 'account/stats';
      params = { last };
      break;
    case 'dmca':
      endpoint = 'files/dmca';
      params = { last };
      break;
    case 'deleted':
      endpoint = 'files/deleted';
      params = { last };
      break;
    case 'file_info':
      if (!file_code) {
        return NextResponse.json({ status: 'error', error: 'Missing file_code' }, { status: 400 });
      }
      endpoint = 'file/info';
      params = { file_code };
      break;
    default:
      return NextResponse.json({ status: 'error', error: 'Unknown method' }, { status: 400 });
  }

  try {
    const url = buildUrl(endpoint, params);
    const response = await fetch(url);
    const json = await response.json();
    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ status: 'error', error: err.message || 'Unknown error' }, { status: 500 });
  }
}
