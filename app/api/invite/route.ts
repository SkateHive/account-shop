import { NextRequest, NextResponse } from 'next/server';
import serverMailer from '../../lib/invite/emailService';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, subject, createdby, desiredUsername, masterPassword, keys, language } = body;
  const success = await serverMailer(to, subject, createdby, desiredUsername, masterPassword, keys, language);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
}
