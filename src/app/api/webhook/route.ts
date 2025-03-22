import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req) {
  try {
    const { date, time } = await req.json();

    // Load Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;
    const to = process.env.TWILIO_TO;

    const client = twilio(accountSid, authToken);

    // Send WhatsApp message using Twilio
    const message = await client.messages.create({
      from,
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: JSON.stringify({
        '1': date, // e.g., "12/1"
        '2': time, // e.g., "3pm"
      }),
      to,
    });

    console.log('✅ Message SID:', message.sid);

    // Emit message to Socket.io clients
    if (global.io) {
      global.io.emit('newMessage', {
        date,
        time,
        sid: message.sid,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully!',
      sid: message.sid,
    });
  } catch (error) {
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
