import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CertificadoTimeline } from "@/components/CertificadoTimeline";
import { diasEnEstadoActual, flujoDe, severidad, COLOR_SEVERIDAD } from "@/lib/certificados";
import { formatMonto } from "@/lib/format";
import type { TipoComitente } from "@/lib/types";

export default async function ObraDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: obra, error: errorObra } = await supabase
    .from("obras")
    .select("id, nombre, ubicacion, presupuesto_total, moneda, comitentes(nombre, tipo)")
    .eq("id", id)
    .maybeSingle();

  if (errorObra) throw errorObra;
  if (!obra) notFound();

  const { data: certificados, error: errorCertificados } = await supabase
    .from("certificados")
    .select(
      "id, numero_certificado, numero_expediente, monto, moneda, estado, fecha_presentacion, fecha_ultimo_cambio_estado, comitentes(tipo), certificado_hitos(hitos_avance(id, fecha, tipo_hito, descripcion, fotos))"
    )
    .eq("obra_id", id)
    .order("fecha_presentacion", { ascending: false });

  if (errorCertificados) throw errorCertificados;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <Link href="/dashboard" className="text-sm text-sand-dim hover:text-sand">
        ← Obras activas
      </Link>

      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-sand">
        {obra.nombre}
      </h1>
      <p className="mt-1 text-sand-dim">
        {obra.ubicacion} · {obra.comitentes?.nombre}
      </p>
      <p className="font-[family-name:var(--font-display)] mt-4 text-2xl font-bold text-sand">
        {formatMonto(obra.presupuesto_total, obra.moneda)}
        <span className="ml-2 font-[family-name:var(--font-body)] text-sm font-normal text-sand-dim">
          presupuesto total
        </span>
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-bold text-sand">
        Certificados
      </h2>

      {!certificados?.length ? (
        <p className="mt-4 text-sand-dim">Todavía no hay certificados presentados.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {certificados.map((c) => {
            const tipo = c.comitentes?.tipo as TipoComitente;
            const dias = diasEnEstadoActual(c.fecha_ultimo_cambio_estado);
            const sev = severidad(c.estado, dias, tipo);
            const evidencia = c.certificado_hitos.map((ch) => ch.hitos_avance).filter(Boolean);

            return (
              <li key={c.id} className="rounded-lg bg-sand p-5 text-charcoal">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold">
                    {c.numero_certificado ?? "Sin número"}
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold">
                    {formatMonto(c.monto, c.moneda)}
                  </p>
                </div>
                <p className="text-sm text-charcoal/75">Expediente {c.numero_expediente ?? "—"}</p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: COLOR_SEVERIDAD[sev] }}
                  />
                  <span>
                    {c.estado === "pagado" ? "Pagado" : `${dias} días en este paso`}
                  </span>
                </div>

                <div className="mt-5">
                  <CertificadoTimeline flujo={flujoDe(tipo)} estadoActual={c.estado} />
                </div>

                {evidencia.length > 0 && (
                  <div className="mt-5 border-t border-charcoal/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/75">
                      Evidencia de avance
                    </p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {evidencia.map((h) => (
                        <li key={h!.id} className="text-sm">
                          <span className="font-semibold">{h!.tipo_hito}</span>
                          {h!.descripcion ? ` — ${h!.descripcion}` : ""}
                          <span className="text-charcoal/75">
                            {" "}
                            ({new Date(h!.fecha).toLocaleDateString("es-PY")})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
