import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Farcaster webhook received:', body);
    
    // Handle different webhook events
    switch (body.type) {
      case 'frame_added':
        console.log('Frame was added by user:', body.data);
        // You can store the user's token here for future notifications
        break;
      case 'frame_removed':
        console.log('Frame was removed by user:', body.data);
        // Clean up user's notification token
        break;
      case 'notifications_enabled':
        console.log('Notifications enabled by user:', body.data);
        break;
      case 'notifications_disabled':
        console.log('Notifications disabled by user:', body.data);
        break;
      default:
        console.log('Unknown webhook type:', body.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Farcaster webhook endpoint' });
}
