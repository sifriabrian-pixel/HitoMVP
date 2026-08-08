export default async function ObraDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: línea de tiempo de avances + lista de certificados + presupuestado vs certificado vs cobrado
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Obra {id}</h1>
    </main>
  );
}
