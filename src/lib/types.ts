// Modelo de datos — ver SPEC.md sección 5.

export type Rol = "dueño" | "arquitecto" | "admin";
export type TipoComitente = "publico" | "privado";
export type EstadoObra = "activa" | "pausada" | "finalizada";
export type CanalCarga = "whatsapp" | "panel";

export type EstadoCertificadoPublico =
  | "presentado"
  | "en_fiscalizacion"
  | "certificado_reconocimiento_emitido"
  | "pagado";

export type EstadoCertificadoPrivado = "presentado" | "aprobado" | "pagado";

export type EstadoCertificado =
  | EstadoCertificadoPublico
  | EstadoCertificadoPrivado;

export type TipoAlerta = "certificado_estancado" | "vencimiento_proximo";
export type EstadoAlerta = "activa" | "resuelta";

export interface Tenant {
  id: string;
  nombre: string;
  pais: string;
  moneda_base: "PYG" | "USD";
  plan: string;
}

export interface Usuario {
  id: string;
  tenant_id: string;
  nombre: string;
  rol: Rol;
  telefono_whatsapp?: string;
  email?: string;
  obras_asignadas: string[]; // Obra["id"][]
}

export interface Comitente {
  id: string;
  tenant_id: string;
  nombre: string;
  tipo: TipoComitente;
  organismo?: string; // solo si tipo === "publico"
}

export interface Obra {
  id: string;
  tenant_id: string;
  comitente_id: string;
  nombre: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_estimada_fin: string;
  presupuesto_total: number;
  moneda: "PYG" | "USD";
  estado: EstadoObra;
  fiscalizador_interno: boolean;
  fiscalizador_nombre?: string;
  hitos_configurados: string[];
}

export interface HitoAvance {
  id: string;
  obra_id: string;
  fecha: string;
  tipo_hito: string;
  porcentaje_avance?: number;
  descripcion?: string;
  fotos: string[];
  nota_voz_url?: string;
  transcripcion?: string;
  cargado_por: string; // Usuario["id"]
  canal: CanalCarga;
}

export interface Certificado {
  id: string;
  obra_id: string;
  comitente_id: string;
  numero_certificado: string;
  numero_expediente: string;
  hitos_vinculados: string[]; // HitoAvance["id"][]
  monto: number;
  moneda: "PYG" | "USD";
  estado: EstadoCertificado;
  fecha_presentacion: string;
  fecha_ultimo_cambio_estado: string;
  dias_en_estado_actual: number; // calculado
}

export interface Alerta {
  id: string;
  certificado_id: string;
  tipo: TipoAlerta;
  umbral_dias: number;
  fecha_generada: string;
  estado: EstadoAlerta;
  enviada_a: string; // Usuario["id"]
}
