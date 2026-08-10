import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const UMBRAL_DIAS: Record<"publico" | "privado", number> = {
  publico: 15,
  privado: 7,
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: obras, error: errorObras } = await supabase
    .from("obras")
    .select("id, nombre, ubicacion, estado, comitentes(tipo)")
    .eq("estado", "activa")
    .order("nombre");

  const { data: certificados, error: errorCertificados } = await supabase
    .from("certificados")
    .select("obra_id, fecha_ultimo_cambio_estado, comitentes(tipo)")
    .neq("estado", "pagado");

  // TEMPORAL: mostrar el error real en pantalla para diagnosticar el 500 en
  // producción sin acceso a los logs de Vercel. Quitar una vez resuelto.
  const error = errorObras ?? errorCertificados;
  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-400">Error consultando Supabase</h1>
        <pre className="mt-4 whitespace-pre-wrap text-sm text-neutral-400">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  const diasEnEstadoActual = (fecha: string) =>
    Math.floor((Date.now() - new Date(fecha).getTime()) / (1000 * 60 * 60 * 24));

  const obraTieneAtraso = (obraId: string) =>
    certificados?.some((c) => {
      if (c.obra_id !== obraId) return false;
      const tipo = c.comitentes?.tipo as "publico" | "privado" | undefined;
      if (!tipo) return false;
      return diasEnEstadoActual(c.fecha_ultimo_cambio_estado) > UMBRAL_DIAS[tipo];
    }) ?? false;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Obras activas</h1>

      {!obras?.length ? (
        <p className="mt-4 text-neutral-500">No hay obras activas todavía.</p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-800">
          {obras.map((obra) => {
            const atrasada = obraTieneAtraso(obra.id);
            return (
              <li key={obra.id} className="flex items-center justify-between py-4">
                <Link href={`/obras/${obra.id}`} className="hover:underline">
                  <p className="font-medium">{obra.nombre}</p>
                  <p className="text-sm text-neutral-500">{obra.ubicacion}</p>
                </Link>
                <span
                  className={
                    "flex items-center gap-2 text-sm " +
                    (atrasada ? "text-red-400" : "text-emerald-400")
                  }
                >
                  <span
                    className={
                      "h-2.5 w-2.5 rounded-full " +
                      (atrasada ? "bg-red-400" : "bg-emerald-400")
                    }
                  />
                  {atrasada ? "Con certificados atrasados" : "Al día"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
