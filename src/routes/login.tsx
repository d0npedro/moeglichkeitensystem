import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-surface p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">
            Möglichkeitensystem
          </p>
          <h1 className="mt-2 font-display text-2xl">Anmelden</h1>
          <p className="mt-2 text-sm text-muted">
            Optional. Das Feld selbst ist ohne Konto nutzbar.
          </p>
        </div>
        {authEnabled ? (
          <div className="space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Weiter mit {p.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Anmeldung ist abgeschaltet.</p>
        )}
        <Link to="/" className="inline-block text-sm text-muted hover:text-fg">
          Zurück zur Arbeit
        </Link>
      </div>
    </main>
  );
}
