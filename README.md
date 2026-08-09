# HITO

De la obra al cobro, sin perseguir papeles. Gestión de certificados de obra y
cobro para constructoras chicas-medianas — foco inicial en Paraguay.

Ver [SPEC.md](./SPEC.md) para la especificación técnica completa.

## Desarrollo local

```bash
npm run dev
```

Variables de entorno requeridas — ver [.env.example](./.env.example). Las que
empiezan con `NEXT_PUBLIC_` se inlinean en el bundle en tiempo de build: si se
agregan o cambian en Vercel después de un deploy, hace falta un redeploy nuevo
para que tomen efecto.

## Stack

Next.js + TypeScript + Tailwind, Supabase (DB/auth/storage), desplegado en
Vercel — ver sección 8 de SPEC.md.
