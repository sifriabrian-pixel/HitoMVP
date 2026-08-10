import type { EstadoCertificado, TipoComitente } from "./types";

// Umbrales de alerta por tipo de comitente — spec sección 9.
export const UMBRAL_DIAS: Record<TipoComitente, number> = {
  publico: 15,
  privado: 7,
};

// Circuito de estados por tipo de comitente — spec sección 4.2.
export const FLUJO_PUBLICO: EstadoCertificado[] = [
  "presentado",
  "en_fiscalizacion",
  "certificado_reconocimiento_emitido",
  "pagado",
];
export const FLUJO_PRIVADO: EstadoCertificado[] = ["presentado", "aprobado", "pagado"];

export function flujoDe(tipo: TipoComitente): EstadoCertificado[] {
  return tipo === "publico" ? FLUJO_PUBLICO : FLUJO_PRIVADO;
}

export const ETIQUETA_ESTADO: Record<EstadoCertificado, string> = {
  presentado: "Presentado",
  en_fiscalizacion: "En fiscalización",
  certificado_reconocimiento_emitido: "Cert. de reconocimiento emitido",
  aprobado: "Aprobado",
  pagado: "Pagado",
};

export function diasEnEstadoActual(fechaUltimoCambio: string): number {
  return Math.floor(
    (Date.now() - new Date(fechaUltimoCambio).getTime()) / (1000 * 60 * 60 * 24)
  );
}

export type Severidad = "normal" | "atencion" | "critica" | "pagado";

// Escala derivada de terracota (spec de diseño sección 2): sin verde/rojo
// semáforo genérico. "Atención" a partir del umbral de alerta del comitente,
// "crítica" al doble de ese umbral.
export function severidad(
  estado: EstadoCertificado,
  dias: number,
  tipo: TipoComitente
): Severidad {
  if (estado === "pagado") return "pagado";
  const umbral = UMBRAL_DIAS[tipo];
  if (dias > umbral * 2) return "critica";
  if (dias > umbral) return "atencion";
  return "normal";
}

// Estimación simple de horizonte de cobro por etapa del circuito — no hay
// fecha de vencimiento explícita en el modelo (spec sección 5), así que la
// proyección de caja se apoya en esta heurística por etapa. A refinar con
// datos históricos reales una vez que haya certificados cobrados para medir.
const HORIZONTE_COBRO_DIAS: Record<EstadoCertificado, 30 | 60 | 90> = {
  certificado_reconocimiento_emitido: 30,
  aprobado: 30,
  en_fiscalizacion: 60,
  presentado: 90,
  pagado: 30, // no se usa: los pagados no entran en la proyección
};

export function horizonteCobro(estado: EstadoCertificado): 30 | 60 | 90 {
  return HORIZONTE_COBRO_DIAS[estado];
}

export const COLOR_SEVERIDAD: Record<Severidad, string> = {
  critica: "var(--terracota)",
  atencion: "var(--terracota-atencion)",
  normal: "var(--sand-dim)",
  pagado: "var(--verde-tierra)",
};
