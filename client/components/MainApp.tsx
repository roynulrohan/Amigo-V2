import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocket } from '../contexts/SocketProvider';
import { ONLINE_USERS } from '../redux/constants';
import { Sidebar } from './Sidebar';

export const MainApp = () => {
    const dispatch = useDispatch();
    const socket: Socket | undefined = useSocket();

    useEffect(() => {
        if (socket === null) return;

        socket?.on('online-users', (users: string[]) => {
            dispatch({ type: ONLINE_USERS, payload: users });
        });

        return () => {
            socket && socket?.off('online-users');
        };
    }, [socket, dispatch]);

    return (
        <div className='h-screen bg-dark '>
            <Sidebar />
        </div>
    );
};
