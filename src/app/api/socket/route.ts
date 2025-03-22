import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { NextResponse } from 'next/server';

let io: IOServer | null = null;

export const GET = async (req: Request) => {
  if (!io) {
    const server = (req as any).socket?.server as HttpServer;

    if (server) {
      io = new IOServer(server, {
        path: '/api/socket',
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });

      io.on('connection', (socket: Socket) => {
        console.log('⚡ Client connected:', socket.id);

        socket.on('disconnect', () => {
          console.log('🔥 Client disconnected:', socket.id);
        });
      });
    }
  }

  return NextResponse.json({ message: 'Socket.io initialized' });
};
