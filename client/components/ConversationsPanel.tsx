import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_ALL_CONVERSATIONS } from '../graphql/queries';
import { AuthReducer, Conversation, GeneralReducer } from '../types';
import { RecentCard } from './RecentCard';

export const ConversationsPanel = () => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const onlineUsers = useSelector((state: GeneralReducer) => state.general.onlineUsers);
    const [getConversations, { data: conversationData, loading: conversationsLoading }] = useLazyQuery(GET_ALL_CONVERSATIONS);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversations();
    }, [getConversations]);

    useEffect(() => {
        if (conversationData) {
            setConversations(conversationData.getAllConversations);
        }
    }, [conversationData]);

    return (
        <div className='px-2 py-4'>
            {conversations.map((conversation: Conversation) => {
                const copy = { ...conversation };
                copy['participants'] = [...conversation.participants.filter((participant) => participant !== auth.user.username)];

                const isOnline = onlineUsers.find((o) => o.id === copy['participants'][0]);

                return <RecentCard key={conversation._id} conversation={copy} status={isOnline ? isOnline.status : 'offline'} />;
            })}
        </div>
    );
};
