export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 p-8">
        <h1 className="text-2xl font-bold">HITO</h1>
        <p className="mt-1 text-sm text-neutral-500">
          De la obra al cobro, sin perseguir papeles.
        </p>
        {/* TODO: login por email + contraseña o magic link (spec sección 10) */}
      </div>
    </main>
  );
}
