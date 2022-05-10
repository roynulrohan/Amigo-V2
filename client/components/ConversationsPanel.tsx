import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_ALL_CONVERSATIONS } from '../graphql/queries';
import { AuthReducer, Conversation } from '../types';
import { RecentCard } from './RecentCard';

export const ConversationsPanel = () => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const [getConversations, { data: conversationData, loading: conversationsLoading }] = useLazyQuery(GET_ALL_CONVERSATIONS);

    useEffect(() => {
        getConversations();
    }, [getConversations]);

    return (
        <div className='px-2 py-4'>
            {!conversationsLoading && conversationData ? (
                conversationData.getAllConversations.map((conversation: Conversation) => {
                    const copy = { ...conversation };
                    copy['participants'] = [...conversation.participants.filter((participant) => participant !== auth.user.username)];

                    return <RecentCard key={conversation._id} conversation={copy} />;
                })
            ) : (
                <></>
            )}
        </div>
    );
};
