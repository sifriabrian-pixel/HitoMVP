import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { diasEnEstadoActual, severidad, UMBRAL_DIAS, COLOR_SEVERIDAD } from "@/lib/certificados";
import type { TipoComitente } from "@/lib/types";

type ObraConAtraso = {
  id: string;
  nombre: string;
  ubicacion: string | null;
  atrasados: number;
  diasMasViejo: number;
  peorSeveridad: "normal" | "atencion" | "critica";
  sobreUmbral: number; // usado solo para ordenar
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: obras, error: errorObras } = await supabase
    .from("obras")
    .select("id, nombre, ubicacion, estado")
    .eq("estado", "activa");

  const { data: certificados, error: errorCertificados } = await supabase
    .from("certificados")
    .select("obra_id, fecha_ultimo_cambio_estado, estado, comitentes(tipo)")
    .neq("estado", "pagado");

  if (errorObras || errorCertificados) {
    throw errorObras ?? errorCertificados;
  }

  const obrasConAtraso: ObraConAtraso[] = (obras ?? []).map((obra) => {
    const certsDeLaObra = (certificados ?? []).filter((c) => c.obra_id === obra.id);

    const atrasados = certsDeLaObra
      .map((c) => {
        const tipo = c.comitentes?.tipo as TipoComitente | undefined;
        if (!tipo) return null;
        const dias = diasEnEstadoActual(c.fecha_ultimo_cambio_estado);
        const sev = severidad(c.estado, dias, tipo);
        return sev === "normal" || sev === "pagado" ? null : { dias, sev, sobreUmbral: dias - UMBRAL_DIAS[tipo] };
      })
      .filter((x): x is { dias: number; sev: "atencion" | "critica"; sobreUmbral: number } => x !== null);

    const diasMasViejo = atrasados.reduce((max, c) => Math.max(max, c.dias), 0);
    const peorSeveridad: "normal" | "atencion" | "critica" = atrasados.some((c) => c.sev === "critica")
      ? "critica"
      : atrasados.length > 0
        ? "atencion"
        : "normal";
    const sobreUmbral = atrasados.reduce((max, c) => Math.max(max, c.sobreUmbral), -1);

    return {
      id: obra.id,
      nombre: obra.nombre,
      ubicacion: obra.ubicacion,
      atrasados: atrasados.length,
      diasMasViejo,
      peorSeveridad,
      sobreUmbral,
    };
  });

  // Severidad primero — la obra más comprometida arriba, no orden alfabético.
  obrasConAtraso.sort((a, b) => b.sobreUmbral - a.sobreUmbral);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-sand">
        Obras activas
      </h1>

      {!obrasConAtraso.length ? (
        <p className="mt-6 text-sand-dim">No hay obras activas todavía.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {obrasConAtraso.map((obra) => (
            <li key={obra.id}>
              <Link
                href={`/obras/${obra.id}`}
                className="flex flex-col gap-3 rounded-lg bg-sand px-5 py-4 text-charcoal transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold">
                    {obra.nombre}
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-sm text-charcoal/75">
                    {obra.ubicacion}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm sm:shrink-0 sm:text-right">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COLOR_SEVERIDAD[obra.peorSeveridad] }}
                  />
                  <span>
                    {obra.atrasados === 0
                      ? "Al día"
                      : `${obra.atrasados} certificado${obra.atrasados > 1 ? "s" : ""} atrasado${obra.atrasados > 1 ? "s" : ""}, el más viejo hace ${obra.diasMasViejo} días`}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
