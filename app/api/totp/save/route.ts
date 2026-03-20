import { NextResponse } from 'next/server';
import mongodb from '@/app/utils/mongodb';
import User from '@/app/models/user.model';
import { protectRoute } from '@/app/utils/protectRoute';

export async function POST(request: Request) {
  try {
    const protection = await protectRoute(request, false);    
    if (!protection.isValid) return protection.error!;
    const {secret } = await request.json();
    if (!protection.decoded || !secret) return NextResponse.json({ success: false });
    await mongodb.dbConnect();
    await User.updateMany(
      { email: protection.decoded.email },
      { $set: { twoFactorAuth: true, totpSecret: secret } }
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save TOTP secret" }, { status: 500 });
  }
}
