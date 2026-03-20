import PageHeader from "../components/ui/PageHeader/PageHeader";
import InboxClient from "./InboxClient";

type EmailMessage = { uid: number; from?: string; subject?: string };
type ApiResponse = { success: boolean; found?: number; messages?: EmailMessage[]; error?: string };

export default async function Page() {
  let data: ApiResponse | null = null;
  try {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  const res = await fetch(`${base}/email?limit=50`, { cache: 'no-store' });
    const json = (await res.json()) as ApiResponse;
    data = json;
    if (data.messages) {
      data.messages.sort((a, b) => (b.uid) - (a.uid));
    }
    // ignore errors here — client component will poll and show errors if needed
    if (!res.ok || !data?.success) data = null;
  } catch {
    data = null;
  }

  return (
    <>
      <PageHeader h1="Email Inbox" h2="Read all messages and issues sent by the customer via email" 
        color="darkred" img="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></PageHeader>

      {/* Client component handles live updates via polling */}
      <InboxClient initialMessages={data?.messages ?? []} limit={50} pollIntervalMs={5000} />
    </>
  );
}
