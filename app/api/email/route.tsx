import { protectRoute } from "@/app/utils/protectRoute"
import nodemailer from "nodemailer";

interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
}

/**
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // const protection = await protectRoute(request, false);
    const requestData: EmailRequestBody = await request.json();

    // if (!protection.isValid) {
    //   return protection.error!;
    // }
    

    if (!requestData || !requestData.to || !requestData.subject || !requestData.text) {
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
    const info = await transporter.sendMail({
        from: process.env.SUPPORT_EMAIL,
        to: to,
        subject: subject,
        text: text,
    });
}