import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../contexts/SocketProvider';
import { Sidebar } from './Sidebar';

export const MainApp = () => {
    const socket: Socket | undefined = useSocket();
    const [yes, setyes] = useState('');

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log(socket.id);
                setyes(socket.id);
            });

            setyes(socket.id);
        }
    }, [socket]);

    return (
        <div className='h-screen bg-dark '>
            <Sidebar />
        </div>
    );
};
