"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type VerifyState =
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function getApiBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, "");
  }

  // Local fallback for this repo: backend is typically run on port 5000.
  return "http://localhost:5000/api/v1";
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [state, setState] = useState<VerifyState>({
    status: "loading",
    message: "Verifying your email...",
  });

  useEffect(() => {
    async function verify() {
      if (!token) {
        setState({
          status: "error",
          message: "Missing verification token in the URL.",
        });
        return;
      }

      try {
        const apiBase = getApiBaseUrl();
        const response = await fetch(`${apiBase}/auth/verify-email/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        let payload: { ok?: boolean; message?: string; error?: string } = {};
        try {
          payload = (await response.json()) as { ok?: boolean; message?: string; error?: string };
        } catch {
          payload = {};
        }

        if (!response.ok || !payload.ok) {
          setState({
            status: "error",
            message: payload.error || "Verification failed. The link may be invalid or expired.",
          });
          return;
        }

        setState({
          status: "success",
          message: payload.message || "Your email has been verified successfully.",
        });
      } catch {
        setState({
          status: "error",
          message: "Unable to reach the server. Please try again in a moment.",
        });
      }
    }

    void verify();
  }, [token]);

  const statusColor = state.status === "success" ? "text-green-600" : state.status === "error" ? "text-red-600" : "text-zinc-700";

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <section className="mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Email verification</h1>
        <p className={`mt-4 text-base ${statusColor}`}>{state.message}</p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}