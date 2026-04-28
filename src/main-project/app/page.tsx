import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 text-zinc-900">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Auth Setup</h1>
        <p className="mt-3 text-zinc-600">
          Use the links below to sign in to backoffice or create a user.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin"
            className="inline-flex flex-1 items-center justify-center rounded-md border border-zinc-300 px-4 py-2 font-medium text-zinc-800"
          >
            Admin
          </Link>
          <Link
            href="/login"
            className="inline-flex flex-1 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 font-medium text-white"
          >
            Login
          </Link>
          <Link
            href="/create-user"
            className="inline-flex flex-1 items-center justify-center rounded-md border border-zinc-300 px-4 py-2 font-medium text-zinc-800"
          >
            Create User
          </Link>
        </div>
      </div>
    </main>
  );
}
