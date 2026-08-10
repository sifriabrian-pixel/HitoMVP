export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg bg-sand p-8 text-charcoal">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">HITO</h1>
        <p className="mt-1 text-sm text-charcoal/75">
          De la obra al cobro, sin perseguir papeles.
        </p>
        {/* TODO: login por email + contraseña o magic link (spec sección 10) */}
      </div>
    </main>
  );
}
