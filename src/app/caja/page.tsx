import { createClient } from "@/lib/supabase/server";
import { horizonteCobro } from "@/lib/certificados";
import { formatMonto } from "@/lib/format";
import type { Moneda } from "@/lib/types";

const HORIZONTES = [30, 60, 90] as const;

export default async function ProyeccionCajaPage() {
  const supabase = await createClient();

  const { data: certificados, error } = await supabase
    .from("certificados")
    .select("monto, moneda, estado")
    .neq("estado", "pagado");

  if (error) throw error;

  const monedas = Array.from(new Set((certificados ?? []).map((c) => c.moneda)));

  const totalPorHorizonte = (horizonte: 30 | 60 | 90, moneda: Moneda) =>
    (certificados ?? [])
      .filter((c) => c.moneda === moneda && horizonteCobro(c.estado) === horizonte)
      .reduce((sum, c) => sum + c.monto, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-sand">
        Proyección de caja
      </h1>
      <p className="mt-1 text-sand-dim">
        Certificados en curso, agrupados por horizonte estimado de cobro.
      </p>

      {!certificados?.length ? (
        <p className="mt-6 text-sand-dim">No hay certificados en curso todavía.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HORIZONTES.map((horizonte) => (
            <div key={horizonte} className="rounded-lg bg-sand p-5 text-charcoal">
              <p className="text-sm font-semibold uppercase tracking-wide text-charcoal/75">
                A {horizonte} días
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {monedas.map((moneda) => {
                  const total = totalPorHorizonte(horizonte, moneda);
                  if (total === 0) return null;
                  return (
                    <p
                      key={moneda}
                      className="font-[family-name:var(--font-display)] text-2xl font-bold"
                    >
                      {formatMonto(total, moneda)}
                    </p>
                  );
                })}
                {monedas.every((m) => totalPorHorizonte(horizonte, m) === 0) && (
                  <p className="text-charcoal/75">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
