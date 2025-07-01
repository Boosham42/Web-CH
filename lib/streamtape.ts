import fetch from 'node-fetch';

interface StreamtapeTicketResponse {
  status: number;
  msg: string;
  result: {
    ticket: string;
    wait_time: number;
    valid_until: string;
  };
}

interface StreamtapeDownloadResponse {
  status: number;
  msg: string;
  result: {
    url: string;
    name: string;
    size: number;
  };
}

export async function download(url: string, user: string, pass: string): Promise<{ url: string }> {
  const match = url.match(/\/v\/([a-zA-Z0-9]+)/);
  const file = match?.[1];

  if (!file) {
    throw new Error('No se pudo extraer el ID del archivo de la URL');
  }

  // Paso 1: Obtener el ticket
  const ticketRes = await fetch(
    `https://api.streamtape.com/file/dlticket?file=${file}&login=${user}&key=${pass}`
  );
  const ticketData = await ticketRes.json() as StreamtapeTicketResponse;

  if (ticketData.status !== 200 || !ticketData.result?.ticket) {
    throw new Error(`Error al obtener ticket: ${ticketData.msg}`);
  }

  const ticket = ticketData.result.ticket;
  const waitTime = ticketData.result.wait_time || 5;

  await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));

  // Paso 2: Obtener enlace directo
  const dlRes = await fetch(
    `https://api.streamtape.com/file/dl?file=${file}&ticket=${ticket}`
  );
  const dlData = await dlRes.json() as StreamtapeDownloadResponse;

  if (dlData.status !== 200 || !dlData.result?.url) {
    throw new Error(`Error al obtener enlace de descarga: ${dlData.msg}`);
  }

  return { url: dlData.result.url };
}
