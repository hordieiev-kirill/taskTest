import { useEffect, useMemo, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import '../style/topMenu.css';

const SOCKET_URL = 'http://localhost:3000';

function pad(num: number, size = 2) {
  return String(num).padStart(size, '0');
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function TopMenu() {
  const [now, setNow] = useState(() => new Date());
  const [sessions, setSessions] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnectionAttempts: 3,
      transports: ['websocket'],
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('sessions', (count: number) => setSessions(count));
    socket.on('connect_error', () => setConnected(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  const dateString = useMemo(() => now.toLocaleDateString(), [now]);
  const timeString = useMemo(() => formatTime(now), [now]);

  return (
    <header className="top-menu">
      <div className="top-menu__left">
        <h1 className="top-menu__title">Inventory demo</h1>
      </div>
      <div className="top-menu__right">
        <div className="top-menu__datetime">
          <span className="top-menu__date">{dateString}</span>
          <span className="top-menu__time">{timeString}</span>
        </div>
        <div className="top-menu__sessions">
          <span className="top-menu__label">Active sessions</span>
          <span className="top-menu__count">
            {connected ? (sessions ?? '…') : 'offline'}
          </span>
        </div>
      </div>
    </header>
  );
}
