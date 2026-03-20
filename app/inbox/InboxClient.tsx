"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import InboxMessageItem from "../components/ui/InboxMessageItem/InboxMessageItem";
import SearchBar from '@/app/components/ui/SearchBar/SearchBar';

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
  const [query, setQuery] = useState("");

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    latestRef.current = JSON.stringify(messages);
  }, [messages]);

  const fetchLatest = useCallback(async () => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? '/api';
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
  }, [limit]);

  useEffect(() => {
    const t = setTimeout(() => { void fetchLatest(); }, 50);
    const id = setInterval(() => { void fetchLatest(); }, pollIntervalMs);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [fetchLatest, pollIntervalMs]);

  const visible = query.trim()
    ? messages.filter((m) => {
        const q = query.toLowerCase();
        return (m.subject ?? "").toLowerCase().includes(q) || (m.from ?? "").toLowerCase().includes(q) || String(m.uid).includes(q);
      })
    : messages;

  return (
    <main className="px-6 py-6 max-w-4xl mx-auto font-sans text-slate-100">
      <div className="mb-4">
        <SearchBar
          searchTerm={query}
          onSearchChange={setQuery}
          placeholder="Search by subject, sender or id"
          focusColor="blue">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { void fetchLatest(); }}
              className="px-3 py-2 rounded-md bg-sky-800 hover:bg-sky-600 text-white text-sm font-medium focus:outline-none cursor-pointer">
              Refresh
            </button>
          </div>
        </SearchBar>
      </div>

      {error ? (
        <div className="rounded-md border border-red-700 text-red-200 p-3" role="status">Fail of loading: {error}</div>
      ) : (
        <section>
          <div className="rounded-xl shadow border-2 border-zinc-700 overflow-hidden">
            <ul className="p-0 m-0 list-none">
              {visible && visible.length > 0 ? (
                visible.map((m) => (
                  <InboxMessageItem key={m.uid} message={m} />
                ))
              ) : (
                <li className="p-6 text-center text-slate-400">Keine Nachrichten gefunden.</li>
              )}
            </ul>
          </div>
        </section>
      )}
    <div className="text-sm text-slate-400 mt-4">Showing <span className="text-slate-100 font-medium">{visible.length}</span> of {messages.length}</div>
    </main>
  );
}
