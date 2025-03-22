import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

let io;

export async function GET() {
  if (!io) {
    io = new Server(globalThis.server, {
      path: '/api/socket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    global.io = io; // Make the Socket.IO instance global
  }

  return NextResponse.json({ message: 'Socket.IO initialized' });
}

export async function POST() {
  return NextResponse.json({ message: 'POST method not implemented' });
}
