export default async function CertificadoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: historial de cambios de estado, expediente, comitente, evidencia vinculada
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Certificado {id}</h1>
    </main>
  );
}
