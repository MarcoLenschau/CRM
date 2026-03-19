import { protectRoute } from "@/app/utils/protectRoute"
import nodemailer from "nodemailer";

interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
    website?: string;
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

    if (!protection.isValid) {
      return protection.error!;
    }

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
}