import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocket } from '../contexts/SocketProvider';
import { GET_ALL_CONVERSATIONS } from '../graphql/queries';
import { CONVERSATIONS, CONVERSATION_COUNT, ONLINE_USERS, SEND_MESSAGE } from '../redux/constants';
import { Chat } from './Chat';
import { Sidebar } from './Sidebar';

export const MainApp = () => {
    const dispatch = useDispatch();
    const socket: Socket | undefined = useSocket();
    const [getConversations, { data: conversationData, loading: conversationsLoading }] = useLazyQuery(GET_ALL_CONVERSATIONS);

    useEffect(() => {
        getConversations();
    }, [getConversations]);

    useEffect(() => {
        if (conversationData) {
            dispatch({ type: CONVERSATIONS, payload: conversationData.getAllConversations });
            dispatch({ type: CONVERSATION_COUNT, payload: conversationData.getAllConversations.length });
        }
    }, [conversationData, dispatch]);

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
        <div className='h-screen bg-dark flex'>
            <Sidebar />
            <Chat />
        </div>
    );
};
