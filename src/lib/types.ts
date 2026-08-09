// Alias de conveniencia sobre el esquema real de Supabase — ver
// src/lib/supabase/database.types.ts (generado) y SPEC.md sección 5.
import type { Tables, Enums } from "./supabase/database.types";

export type Tenant = Tables<"tenants">;
export type Usuario = Tables<"usuarios">;
export type Comitente = Tables<"comitentes">;
export type Obra = Tables<"obras">;
export type HitoAvance = Tables<"hitos_avance">;
export type Certificado = Tables<"certificados">;
export type CertificadoConDias = Tables<"certificados_con_dias">;
export type Alerta = Tables<"alertas">;

export type Rol = Enums<"rol">;
export type TipoComitente = Enums<"tipo_comitente">;
export type EstadoObra = Enums<"estado_obra">;
export type CanalCarga = Enums<"canal_carga">;
export type EstadoCertificado = Enums<"estado_certificado">;
export type TipoAlerta = Enums<"tipo_alerta">;
export type EstadoAlerta = Enums<"estado_alerta">;
export type Moneda = Enums<"moneda">;
