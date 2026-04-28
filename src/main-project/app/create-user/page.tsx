"use client";

import { FormEvent, useState } from "react";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Could not create user.");
      } else {
        setMessage(data.message ?? "User created.");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("Unexpected error while creating the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 text-zinc-900">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Create User</h1>
        <p className="mt-2 text-sm text-zinc-600">
          New users are created with role USER.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              required
            />
          </div>

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
              minLength={8}
              required
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {message ? (
          <p className="mt-4 text-sm text-green-700">{message}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Creating user..." : "Create user"}
        </button>
      </form>
    </main>
  );
}
