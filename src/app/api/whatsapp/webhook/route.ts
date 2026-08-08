import { NextRequest, NextResponse } from "next/server";

// Webhook de Meta Cloud API — recibe notas de voz, texto y fotos del arquitecto (spec sección 4.1 y 6).
export async function GET(request: NextRequest) {
  // Verificación del webhook (hub.challenge) requerida por Meta.
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = searchParams.get("hub.verify_token");

  if (verifyToken === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge);
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // TODO: clasificar mensaje, transcribir audio (STT), resolver obra/hito, registrar HitoAvance.
  void body;
  return NextResponse.json({ ok: true });
}
