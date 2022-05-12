import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

export function useSocket() {
    return useContext(SocketContext);
}

interface Params {
    id: string;
    status: string;
    children: ReactNode;
}

export function SocketProvider({ id, status, children }: Params) {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const newSocket = io(
            // 'http://localhost:4000',
            {
                query: { id, status },
                timeout: 10001,
                transports: ['websocket'],
            }
        );

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [id, status]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
