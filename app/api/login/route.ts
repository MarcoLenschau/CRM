import { NextResponse } from 'next/server';
import { OTP } from 'otplib';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'crm';

export async function POST(request: Request) {
  const { email, password, token } = await request.json();
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection('users');
  const user = await users.findOne({ email });
  if (!user) return NextResponse.json({ success: false, error: 'User not found' });
  // Passwort-Hash prüfen (hier nur als Beispiel, in Produktion bcrypt verwenden!)
  if (user.hash !== password) return NextResponse.json({ success: false, error: 'Wrong password' });

  // Wenn TOTP aktiviert, Code prüfen
  if (user.totpSecret) {
    if (!token) return NextResponse.json({ success: false, requireTOTP: true });
    const otp = new OTP();
    const result = await otp.verify({ token, secret: user.totpSecret });
    if (!result.valid) return NextResponse.json({ success: false, error: 'Invalid TOTP code' });
  }

  // JWT generieren (Mock)
  const jwt = 'mock.jwt.token';
  return NextResponse.json({ success: true, jwt });
}
