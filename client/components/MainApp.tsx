import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocket } from '../contexts/SocketProvider';
import {ONLINE_USERS, SEND_MESSAGE } from '../redux/constants';
import { Chat } from './Chat';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

export const MainApp = () => {
    const dispatch = useDispatch();
    const socket: Socket | undefined = useSocket();

    useEffect(() => {
        if (socket === null) return;

        socket?.on('online-users', (users: string[]) => {
            dispatch({ type: ONLINE_USERS, payload: users });
        });

        socket?.on('receive-message', ({ sender, conversation }) => {
            dispatch({ type: SEND_MESSAGE, payload: { conversation } });
        });

        return () => {
            socket && socket?.off('online-users');
        };
    }, [socket, dispatch]);

    return (
        <div className='h-screen bg-dark'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }} className='flex'>
                <Sidebar />
                <Chat />
            </motion.div>
        </div>
    );
};
