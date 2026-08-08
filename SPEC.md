# HITO — Especificación técnica (MVP)

**De la obra al cobro, sin perseguir papeles.**
Gestión de certificados de obra y cobro para constructoras chicas-medianas — foco inicial en Paraguay.

---

## 1. Contexto y objetivo

Las constructoras chicas-medianas pierden visibilidad y plata en el tramo entre "obra ejecutada" y "obra cobrada". En Paraguay, el circuito de cobro a organismos públicos tiene varios pasos administrativos (Acta de Recepción Provisoria → Fiscalización → Certificado de Reconocimiento de Obligación de Pago → Pago) que hoy se siguen a mano, por WhatsApp suelto o no se siguen. HITO conecta el avance real de obra (cargado por el arquitecto/director de obra vía WhatsApp) con el estado de cada certificado y su cobro, dando al dueño/gerente financiero visibilidad y alertas sin que nadie cambie su forma de trabajar.

**Objetivo del MVP**: validar que una constructora puede reemplazar su seguimiento manual de certificados por HITO en menos de una semana de uso, sin fricción para el arquitecto y con valor visible para el dueño en la primera semana.

---

## 2. Usuarios y roles

| Rol | Quién es | Canal principal | Qué hace |
|---|---|---|---|
| **Dueño / Gerente financiero** | Decide, paga la suscripción | Panel + WhatsApp (alertas pull/push) | Ve estado de obras y certificados, recibe alertas y resumen semanal, proyecta caja |
| **Arquitecto / Director de obra** | Certifica avance | WhatsApp exclusivamente | Carga avance por voz/texto/foto, consulta estado de una obra |
| **Admin** | Configura la cuenta (puede coincidir con el dueño) | Panel | Da de alta obras, comitentes, hitos por obra, usuarios, umbrales de alerta |

Un mismo usuario puede tener más de un rol. Un usuario puede estar asignado a una o varias obras.

---

## 3. Alcance del MVP

**Incluido:**
- Carga de avance de obra vía WhatsApp (Módulo 1)
- Tracking del ciclo de vida del certificado (Módulo 2)
- Alertas, recordatorios y proyección simple de caja (Módulo 3)
- Panel web con las 4-5 pantallas descriptas en la sección 7
- Multi-tenant: varias constructoras usando la misma instancia, datos aislados

**Explícitamente fuera de alcance del MVP** (fases futuras, no construir todavía):
- BIM o comparación de avance contra modelos 3D
- Gestión de RRHH, nómina o asistencia de personal
- Contabilidad completa (libro diario, balances, IVA)
- Gestión de compras, proveedores o inventario
- Atención a compradores finales / cobro de cuotas en pozo (posible Fase 3 futura, ver conversación previa)
- Procesamiento de pagos online — HITO trackea y notifica, no cobra ni mueve dinero
- OCR o extracción automática de datos desde fotos/comprobantes (la foto es solo evidencia adjunta en el MVP)

---

## 4. Módulos funcionales

### 4.1 Carga de avance (WhatsApp)

- El arquitecto envía una nota de voz, texto o foto al número de WhatsApp de HITO.
- El sistema transcribe el audio (speech-to-text) y clasifica el mensaje.
- Si el arquitecto tiene más de una obra asignada, el bot pregunta a cuál corresponde (lista rápida, no texto libre).
- El bot ofrece una lista de hitos/etapas predefinidos para esa obra (configurables por obra: fundación, estructura, mampostería, instalaciones, terminaciones, u otros definidos en el panel) para que el arquitecto elija con un toque.
- Se registra: obra, hito, % de avance (opcional, puede omitirse), descripción/novedades, foto(s) con fecha automática, timestamp, usuario.
- El bot confirma el registro en un mensaje corto.
- Consulta pasiva: el arquitecto puede preguntar "¿cómo viene la obra X?" y recibe el último avance registrado + estado de certificados de esa obra.

### 4.2 Tracking del certificado

- Cada certificado tiene un estado dentro de un flujo configurable según tipo de comitente:
  - **Comitente público**: Presentado → En Fiscalización → Certificado de Reconocimiento de Obligación de Pago emitido → Pagado
  - **Comitente privado**: Presentado → Aprobado → Pagado
- Un certificado se vincula a uno o varios registros de avance (Módulo 1) que lo respaldan como evidencia.
- Cada certificado tiene número de expediente/trámite, monto, moneda, fecha de presentación y fecha del último cambio de estado.
- El sistema calcula automáticamente los días transcurridos en el estado actual.

### 4.3 Cobro y caja

- Alertas automáticas cuando un certificado supera el umbral de días configurado sin cambiar de estado (umbral distinto para comitente público vs. privado — ver sección 9).
- Recordatorios con tono diferenciado: formal/administrativo para organismos públicos, directo para comitentes privados.
- Resumen semanal automático por WhatsApp al dueño/gerente financiero (día y hora configurables, sugerido viernes AM): certificados presentados en la semana, cobrados, atrasados, próximos vencimientos.
- Proyección simple de caja a 30/60/90 días en base a los certificados en curso y su estado.
- Comparación liviana: presupuestado vs. certificado vs. cobrado, por obra — sin pretender ser un módulo contable completo.

---

## 5. Modelo de datos (entidades principales)

```
Tenant (Constructora)
├── id, nombre, país, moneda_base, plan

Usuario
├── id, tenant_id, nombre, rol (dueño | arquitecto | admin)
├── telefono_whatsapp, email
└── obras_asignadas[] (N:N con Obra)

Comitente
├── id, tenant_id, nombre
├── tipo (publico | privado)
└── organismo (ej. MOPC, Municipalidad, Gobernación — solo si tipo=publico)

Obra
├── id, tenant_id, comitente_id, nombre, ubicacion
├── fecha_inicio, fecha_estimada_fin
├── presupuesto_total, moneda
├── estado (activa | pausada | finalizada)
├── fiscalizador_interno (bool), fiscalizador_nombre
└── hitos_configurados[] (lista editable de etapas para esta obra)

HitoAvance (registro de avance)
├── id, obra_id, fecha, tipo_hito
├── porcentaje_avance (opcional), descripcion
├── fotos[], nota_voz_url, transcripcion
├── cargado_por (usuario_id), canal (whatsapp | panel)

Certificado
├── id, obra_id, comitente_id, numero_certificado, numero_expediente
├── hitos_vinculados[] (relación a HitoAvance)
├── monto, moneda
├── estado (según flujo público/privado — sección 4.2)
├── fecha_presentacion, fecha_ultimo_cambio_estado
└── dias_en_estado_actual (calculado)

Alerta
├── id, certificado_id, tipo (certificado_estancado | vencimiento_proximo)
├── umbral_dias, fecha_generada
├── estado (activa | resuelta)
└── enviada_a (usuario_id)
```

---

## 6. Flujos de WhatsApp (conversacionales)

1. **Onboarding de arquitecto**: el admin vincula el número de WhatsApp del arquitecto a una o más obras desde el panel. El arquitecto recibe un mensaje de bienvenida explicando cómo cargar avance.
2. **Carga de avance**: ver 4.1. Debe resolverse en ≤3 interacciones (mensaje inicial + selección de obra si aplica + selección de hito).
3. **Consulta de estado** ("¿cómo viene la obra X?", "¿qué certificados tengo pendientes?"): respuesta inmediata con datos actuales, sin necesidad de abrir el panel.
4. **Resumen semanal (proactivo)**: mensaje automático al dueño, estructurado y corto, con opción de "ver más" que linkea al panel.
5. **Alerta de certificado estancado (proactivo)**: mensaje puntual cuando se cruza el umbral configurado, dirigido al dueño/gerente financiero.

**Nota de costos**: a partir de octubre de 2026, Meta cobra por mensajes de servicio dentro de la ventana de 24hs (hoy gratis). Diseñar los flujos para minimizar mensajes salientes no esenciales: agrupar alertas en vez de mandar una por certificado, y usar el panel como canal principal de consulta pull para el dueño (sin generar mensaje saliente cada vez que se conecta).

---

## 7. Panel web (pantallas)

1. **Login / selección de tenant** (si el usuario pertenece a más de una constructora)
2. **Dashboard**: lista de obras activas con estado resumido — semáforo simple (al día / con certificados atrasados)
3. **Detalle de obra**: línea de tiempo de avances cargados (Módulo 1) + lista de certificados con su estado (Módulo 2) + comparación presupuestado vs. certificado vs. cobrado
4. **Detalle de certificado**: historial completo de cambios de estado, expediente, comitente, fotos/evidencia vinculada
5. **Proyección de caja**: vista simple a 30/60/90 días agregando todas las obras activas
6. **Configuración** (rol admin): alta de obras, comitentes, hitos por obra, usuarios y sus obras asignadas, umbrales de alerta por tipo de comitente

---

## 8. Stack sugerido (ajustable según lo que ya uses en Pulsetrack)

| Capa | Sugerencia | Motivo |
|---|---|---|
| Frontend / panel | Next.js + TypeScript + Tailwind | Rápido de armar, buen soporte de Claude Code, fácil de desplegar |
| Backend | API routes de Next.js o Node/TypeScript separado | Simplicidad para MVP; separar solo si hace falta escalar |
| Base de datos | PostgreSQL (recomendado vía Supabase) | Multi-tenant simple con row-level security, incluye auth y storage |
| WhatsApp | Meta Cloud API directa, o wrapper (360dialog/Twilio) | Directa da más control; wrapper acelera el alta si ya usás algo similar en Pulsetrack |
| Speech-to-text | Whisper API (u otro STT) | Transcripción de notas de voz del arquitecto |
| Storage de archivos | Supabase Storage o S3-compatible | Fotos y audios del Módulo 1 |
| Hosting | Vercel (frontend/API) + Supabase (DB/auth/storage) | Mínima fricción operativa para un equipo chico |

---

## 9. Reglas de negocio — umbrales de alerta

- Umbral configurable por tipo de comitente, con default sugerido:
  - **Comitente público**: 15 días sin cambio de estado → alerta
  - **Comitente privado**: 7 días sin cambio de estado → alerta
- El estado "Certificado de Reconocimiento de Obligación de Pago emitido" solo existe en el flujo de comitente público.
- Las alertas de un mismo certificado no se repiten hasta que se resuelvan o venza un nuevo umbral (evitar spam).

---

## 10. Multi-tenant y seguridad

- Aislamiento de datos por `tenant_id` en todas las tablas — ningún dato de una constructora debe ser visible para otra.
- Row-level security a nivel de base de datos si se usa Supabase/Postgres.
- Autenticación de panel: email + contraseña o magic link (evaluar según fricción deseada para el dueño).
- Vinculación de número de WhatsApp a usuario y tenant — validar que un número no pueda quedar asociado a dos tenants al mismo tiempo.

---

## 11. Criterios de aceptación del MVP

- [ ] Un arquitecto carga un avance por WhatsApp (voz, texto o foto) en menos de 2 minutos, sin instrucciones adicionales más allá del mensaje de bienvenida.
- [ ] El dueño ve en el panel el estado de todos los certificados de sus obras activas, actualizado en tiempo real.
- [ ] El sistema genera una alerta automática cuando un certificado supera el umbral de días configurado para su tipo de comitente.
- [ ] El resumen semanal se envía automáticamente por WhatsApp en el día/hora configurados.
- [ ] El sistema soporta al menos 3 constructoras (tenants) distintas con datos completamente aislados entre sí.
- [ ] La proyección de caja a 30/60/90 días se calcula automáticamente a partir de los certificados en curso, sin carga manual adicional.

---

## 12. Idioma y localización

- Interfaz y mensajes en español (neutro, ajustado a uso rioplatense/paraguayo — "vos", sin modismos exclusivamente argentinos).
- Soporte de moneda dual: guaraníes (PYG) y dólares (USD) por obra, sin conversión automática (cada obra define su moneda).
