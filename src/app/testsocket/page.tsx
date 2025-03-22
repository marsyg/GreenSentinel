'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  path: '/api/socket',
});

interface Message {
  from: string;
  to: string;
  date: string;
  time: string;
  sid: string;
}

const MessageViewer = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('new_message', (msg: Message) => {
      console.log('📩 New message received:', msg);
      setMessages((prev) => [msg, ...prev]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Incoming WhatsApp Messages</h1>
      <div className='space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className='border p-4 rounded-lg shadow'>
            <p>
              <strong>From:</strong> {msg.from}
            </p>
            <p>
              <strong>To:</strong> {msg.to}
            </p>
            <p>
              <strong>Date:</strong> {msg.date}
            </p>
            <p>
              <strong>Time:</strong> {msg.time}
            </p>
            <p>
              <strong>SID:</strong> {msg.sid}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageViewer;
