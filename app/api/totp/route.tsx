import { NextResponse } from 'next/server';
import { OTP } from 'otplib';

// Dummy user store (replace with DB in production)
const userStore: Record<string, { totpSecret?: string }> = {};

export async function POST(request: Request) {
  const { userId } = await request.json();
  // Secret generieren
  const otp = new OTP();
  const secret = otp.generateSecret();
  userStore[userId] = { totpSecret: secret };
  // otpauth URL für QR-Code
  const otpauth = otp.generateURI({
    secret,
    label: userId,
    issuer: 'CRM-App'
  });
  return NextResponse.json({ secret, otpauth });
}

export async function PUT(request: Request) {
  const { userId, token } = await request.json();
  const user = userStore[userId];
  if (!user?.totpSecret) return NextResponse.json({ valid: false });
  const otp = new OTP();
  const result = await otp.verify({ token, secret: user.totpSecret });
  return NextResponse.json({ valid: result.valid });
}
