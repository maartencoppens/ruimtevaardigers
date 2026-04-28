"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin",
      });

      if (!result || result.error) {
        setError("Invalid login or not an admin user.");
        setLoading(false);
        return;
      }

      window.location.assign(result.url ?? "/admin");
    } catch {
      setError("Could not sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 text-zinc-900">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Backoffice Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in with your admin account.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              required
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
