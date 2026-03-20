import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'crm';

export async function POST(request: Request) {
  const { userId, secret } = await request.json();
  if (!userId || !secret) return NextResponse.json({ success: false });
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection('users');
  const result = await users.updateOne({ email: userId }, { $set: { totpSecret: secret } });
  if (result.modifiedCount === 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
