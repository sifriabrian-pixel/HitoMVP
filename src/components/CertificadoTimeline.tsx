import { ETIQUETA_ESTADO } from "@/lib/certificados";
import type { EstadoCertificado } from "@/lib/types";

// Elemento de firma del producto: el paso activo se marca con un mojón
// (el "hito" que le da nombre a HITO), no con un progress bar genérico.
function MojonIcon({ activo }: { activo: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1.5 L17 8 L14.5 18.5 H5.5 L3 8 Z"
        fill={activo ? "var(--terracota)" : "none"}
        stroke={activo ? "var(--terracota)" : "var(--sand-dim)"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CertificadoTimeline({
  flujo,
  estadoActual,
}: {
  flujo: EstadoCertificado[];
  estadoActual: EstadoCertificado;
}) {
  const indiceActual = flujo.indexOf(estadoActual);

  return (
    <ol className="flex items-start gap-1">
      {flujo.map((paso, i) => {
        const completado = i < indiceActual;
        const activo = i === indiceActual;
        return (
          <li key={paso} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <div className="flex w-full items-center">
              <div
                className="h-px flex-1"
                style={{ background: i === 0 ? "transparent" : completado || activo ? "var(--terracota)" : "var(--sand-dim)" }}
              />
              {activo ? (
                <MojonIcon activo />
              ) : (
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    background: completado ? "var(--charcoal)" : "transparent",
                    border: completado ? "none" : "1.5px solid var(--sand-dim)",
                  }}
                />
              )}
              <div
                className="h-px flex-1"
                style={{
                  background:
                    i === flujo.length - 1 ? "transparent" : completado ? "var(--terracota)" : "var(--sand-dim)",
                }}
              />
            </div>
            <span
              className={
                "font-[family-name:var(--font-body)] text-xs leading-tight " +
                (activo ? "font-semibold text-charcoal" : "text-charcoal/75")
              }
            >
              {ETIQUETA_ESTADO[paso]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
