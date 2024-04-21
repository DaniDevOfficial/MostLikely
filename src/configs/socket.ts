import { io } from 'socket.io-client';

const URL: string = import.meta.env.VITE_BACKEND_URL === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);