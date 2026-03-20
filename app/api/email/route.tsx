import { protectRoute } from "@/app/utils/protectRoute"
import { NextResponse } from 'next/server';
import { ImapFlow } from 'imapflow';
import nodemailer from "nodemailer";

interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
    website?: string;
}

/**
 * Handles the GET request to fetch emails with optional filtering and limiting.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A JSON response containing the success status, number of found messages, and the filtered email messages.
 * @throws {Error} If an error occurs during email fetching, filtering, or client logout.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const DEFAULT_LIMIT = 20;
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam !== null && !Number.isNaN(Number(limitParam)) && Number(limitParam) > 0
    ? Math.floor(Number(limitParam)) : DEFAULT_LIMIT;
  const client = createImapClient();
  try {
    const results = await loadMails(client, limit);
    const filtered = results.filter(mail => (mail.subject || "").toLowerCase().includes(process.env.SUBJECT_FILTER!.toLowerCase()));
    await client.logout();
    return NextResponse.json({ success: true, found: filtered.length, messages: filtered });
  } catch (err) {
    try { await client.logout(); } catch { }
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

/**
 * Handles the POST request to send an email.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to an HTTP response object.
 * @throws Will return a 400 response if the email content is missing or if sending the email fails.
 * @security Only accessible to authenticated users.
 * @category EmailService
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    const requestData: EmailRequestBody = await request.json();

    if (!protection.isValid) return protection.error!;

    if (requestData.website || !requestData || !requestData.to || !requestData.subject || !requestData.text) {
      return new Response(
        JSON.stringify({ success: false, error: "No email content provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    await sendMail(requestData.to, requestData.subject, requestData.text);

    return new Response(
      JSON.stringify({ success: true, message: "Email was sent!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email", details: error instanceof Error ? error.message : String(error) }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Sends an email using the specified recipient, subject, and text content.
 *
 * @param to - The email address of the recipient.
 * @param subject - The subject line of the email.
 * @param text - The plain text content of the email.
 * @returns A promise that resolves when the email has been sent successfully.
 * @throws Will throw an error if the email fails to send.
 * @security Only accessible to authenticated users.
 * @category EmailService
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const sendMail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
        from: process.env.SUPPORT_EMAIL,
        to: to,
        subject: subject,
        text: text,
    });
};

/**
 * @return {ImapFlow} A new instance of the ImapFlow client.
 * @category EmailService
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const createImapClient = () => new ImapFlow({ 
  host: process.env.IMAP_HOST!, 
  port: Number(process.env.IMAP_PORT!), 
  secure: true, 
  auth: { 
    user: process.env.IMAP_USER!, 
    pass: process.env.IMAP_PASS! } 
});

/**
 * @category EmailService
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const loadMails = async (client: ImapFlow, limit: number) => {
  await client.connect();
  await client.mailboxOpen('INBOX');
  const uids = (await client.search({})) || [];
  if (!Array.isArray(uids) || uids.length === 0) {
    await client.logout();
    return [] as { uid: number; from?: string; subject?: string }[];
  }
  const selected = uids.slice(-limit);
  const results = [];
    for await (const msg of client.fetch(selected, { envelope: true })) {
      const env = msg.envelope;
      let from: string | undefined;
      const rawFrom = env?.from;

      if (Array.isArray(rawFrom)) {
        const parts = rawFrom.map(a => {
          if (typeof a === 'string') return a;
          const addr = a as { name?: string; address?: string; mailbox?: string; host?: string };
          const address = addr.address ?? ((addr.mailbox || addr.host) ? `${addr.mailbox ?? ''}@${addr.host ?? ''}` : '');
          const safeAddress = address.replace(/^@$/, '');
          return addr.name ? `${addr.name} <${safeAddress}>` : safeAddress;
        }).filter(Boolean);

        from = parts.length ? parts.join(', ') : undefined;
      } else if (typeof rawFrom === 'string') {
        from = rawFrom;
      } else {
        from = undefined;
      }

      results.push({ uid: msg.uid, from, subject: env?.subject ?? undefined });
    }
  return results;
};