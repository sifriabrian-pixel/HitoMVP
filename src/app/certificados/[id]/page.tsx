export default async function CertificadoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: historial de cambios de estado, expediente, comitente, evidencia vinculada
  // (por ahora esta información ya se ve embebida en /obras/[id])
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-sand">
        Certificado {id}
      </h1>
    </main>
  );
}
