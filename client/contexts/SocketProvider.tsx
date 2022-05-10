import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

export function useSocket() {
    return useContext(SocketContext);
}

interface Params {
    id: string;
    children: ReactNode;
}

export function SocketProvider({ id, children }: Params) {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const newSocket = io('http://localhost:4000', {
            query: { id },
            timeout: 10001,
            transports: ['websocket'],
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [id]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
