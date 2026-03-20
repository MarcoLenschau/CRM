"use client";

import React, { useEffect, useRef, useState } from "react";

type EmailMessage = { uid: number; from?: string; subject?: string };

interface Props {
  initialMessages?: EmailMessage[];
  limit?: number;
  pollIntervalMs?: number;
}

export default function InboxClient({ initialMessages = [], limit = 50, pollIntervalMs = 5000 }: Props) {
  const [messages, setMessages] = useState<EmailMessage[]>(() => {
    const copy = Array.isArray(initialMessages) ? [...initialMessages] : [];
    copy.sort((a, b) => (b.uid ?? 0) - (a.uid ?? 0));
    return copy;
  });
  const [error, setError] = useState<string | null>(null);
  const latestRef = useRef<string>(JSON.stringify(messages));
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    // update latestRef when messages change (so compare uses latest value)
    latestRef.current = JSON.stringify(messages);
  }, [messages]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    const fetchLatest = async () => {
      try {
        const res = await fetch(`${base}/email?limit=${limit}`, { cache: 'no-store' });
        const json = await res.json();
        if (!res.ok || !json?.success) {
          const msg = json?.error || `HTTP ${res.status}`;
          if (mountedRef.current) setError(msg);
          return;
        }
        const msgs: EmailMessage[] = Array.isArray(json.messages) ? json.messages : [];
        msgs.sort((a, b) => (b.uid ?? 0) - (a.uid ?? 0));
        const key = JSON.stringify(msgs);
        if (key !== latestRef.current) {
          if (mountedRef.current) {
            setMessages(msgs);
            setError(null);
          }
        }
      } catch (e: unknown) {
        const err = e instanceof Error ? e.message : String(e);
        if (mountedRef.current) setError(err);
      }
    };

    // initial fetch to ensure freshest state on client
    void fetchLatest();
    const id = setInterval(fetchLatest, pollIntervalMs);
    return () => { clearInterval(id); };
  }, [limit, pollIntervalMs]);

  return (
    <main className="px-8 py-8 max-w-4xl mx-auto text-slate-800 font-sans">
      {error ? (
        <div className="border border-red-200 bg-red-900 text-red-800 p-3 rounded" role="status">Fehler beim Laden: {error}</div>
      ) : (
        <section>
          <ul className="grid gap-3 list-none p-0 m-0">
            {messages && messages.length > 0 ? (
              messages.map((m) => (
                <li key={m.uid} className="flex justify-between items-center p-3 rounded border-2 border-zinc-600">
                  <div className="max-w-[80%]">
                    <div className="text-base font-semibold text-slate-900">{m.subject ?? <em>No Subject</em>}</div>
                    <div className="text-sm text-slate-500 mt-1">{m.from ?? <em>Unknown Sender</em>}</div>
                  </div>
                  <div className="text-sm text-slate-400 min-w-[60px] text-right font-bold cursor-pointer hover:underline">#{m.uid}</div>
                </li>
              ))
            ) : (
              <li className="p-4 text-slate-500">Keine Nachrichten gefunden.</li>
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
