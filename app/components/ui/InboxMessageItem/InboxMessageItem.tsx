"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type EmailMessage = { uid: number; from?: string; subject?: string };

function initialsFromName(name?: string) {
  if (!name) return "?";
  const parts = name.replace(/<.*>/, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function InboxMessageItem({ message }: { message: EmailMessage }) {
  const router = useRouter();
  const initials = initialsFromName(message.from);
  const id = String(message.uid ?? '');
  return (
    <li
      onMouseEnter={() => { if (id) void router.prefetch(`/inbox/${id}`); }}
      tabIndex={0}
      className="flex items-center gap-4 p-3 border-1 border-zinc-700"
      aria-label={`Email ${message.subject ?? 'No Subject'} from ${message.from ?? 'Unknown sender'}`}>
      <div className="flex-shrink-0">
        <div className="h-11 w-11 bg-zinc-700 rounded-full text-white flex items-center justify-center font-semibold">
          {initials}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-100 truncate">
            <Link href={`/inbox/${id}`} className="underline hover:text-sky-300 truncate" aria-label={`Open email ${id} - ${message.subject ?? ''}`}>
              {message.subject ?? <em className="text-slate-400">No Subject</em>}
            </Link>
          </div>
          <div className="text-xs text-slate-400 ml-4">
            <Link href={`/inbox/${id}`} className="hover:text-sky-300">#{id}</Link>
          </div>
        </div>
        <div className="mt-1 text-sm text-slate-300 truncate">{message.from ?? <em>Unknown Sender</em>}</div>
      </div>
    </li>
  );
}
