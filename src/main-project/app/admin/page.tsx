import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 text-zinc-900">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Admin Backoffice</h1>
        <p className="mt-3 text-zinc-600">
          You are signed in as admin and can access protected pages.
        </p>
      </div>
    </main>
  );
}
