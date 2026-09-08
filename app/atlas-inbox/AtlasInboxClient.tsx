"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type LogEntry = {
  id: string;
  question: string;
  at: string;
};

const SECRET_STORAGE_KEY = "atlas-inbox-secret";

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AtlasInboxClient() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadEntries = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/atlas/log", {
        headers: { "x-atlas-log-secret": token },
        cache: "no-store",
      });
      const data = (await response.json()) as {
        entries?: LogEntry[];
        error?: string;
      };

      if (!response.ok) {
        setUnlocked(false);
        setEntries([]);
        setError(data.error ?? "Could not unlock the inbox.");
        return;
      }

      setUnlocked(true);
      setEntries(data.entries ?? []);
      try {
        sessionStorage.setItem(SECRET_STORAGE_KEY, token);
      } catch {
        // sessionStorage may be unavailable; ignore.
      }
    } catch {
      setUnlocked(false);
      setEntries([]);
      setError("Could not reach the inbox API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SECRET_STORAGE_KEY);
      if (saved) {
        setSecret(saved);
        void loadEntries(saved);
      }
    } catch {
      // Ignore storage errors.
    }
  }, [loadEntries]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const token = secret.trim();
    if (!token) return;
    void loadEntries(token);
  };

  const onLock = () => {
    setUnlocked(false);
    setEntries([]);
    setSecret("");
    setError(null);
    try {
      sessionStorage.removeItem(SECRET_STORAGE_KEY);
    } catch {
      // Ignore.
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Atlas inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Private log of questions visitors ask Atlas. Not linked from the
          public site.
        </p>

        {!unlocked ? (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium" htmlFor="secret">
              Access secret
            </label>
            <input
              id="secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
              placeholder="ATLAS_LOG_SECRET"
            />
            <button
              type="submit"
              disabled={loading || !secret.trim()}
              className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-sky-600"
            >
              {loading ? "Unlocking…" : "Unlock"}
            </button>
            {error ? (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : null}
          </form>
        ) : (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {entries.length === 0
                  ? "No questions logged yet."
                  : `${entries.length} recent question${entries.length === 1 ? "" : "s"}`}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void loadEntries(secret)}
                  disabled={loading}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={onLock}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
                >
                  Lock
                </button>
              </div>
            </div>

            {error ? (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            ) : null}

            <ul className="mt-6 space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="border-b border-slate-200 pb-4 last:border-b-0 dark:border-slate-800"
                >
                  <time
                    dateTime={entry.at}
                    className="text-xs text-slate-500 dark:text-slate-400"
                  >
                    {formatWhen(entry.at)}
                  </time>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                    {entry.question}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
