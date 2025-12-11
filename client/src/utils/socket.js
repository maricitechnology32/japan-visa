import { io } from 'socket.io-client';

// Ensure this matches your backend URL exactly
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Wait until we explicitly call connect()
  withCredentials: true,
  transports: ['websocket', 'polling'], // Try websocket first
});