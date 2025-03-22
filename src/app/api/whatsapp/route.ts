import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: Request) {
  try {
    const { date, time } = await req.json();

    // Load Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;
    const to = process.env.TWILIO_TO;

    if (!accountSid || !authToken || !from || !to) {
      return NextResponse.json(
        { error: 'Missing Twilio environment variables' },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      from,
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: JSON.stringify({
        '1': date,
        '2': time,
      }),
      to,
    });

    console.log('✅ Message SID:', message.sid);

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully!',
      sid: message.sid,
    });
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
