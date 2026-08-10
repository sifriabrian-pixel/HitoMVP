import type { Moneda } from "./types";

const LOCALE_POR_MONEDA: Record<Moneda, string> = {
  PYG: "es-PY",
  USD: "en-US",
};

export function formatMonto(monto: number, moneda: Moneda): string {
  return new Intl.NumberFormat(LOCALE_POR_MONEDA[moneda], {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: moneda === "PYG" ? 0 : 2,
  }).format(monto);
}
