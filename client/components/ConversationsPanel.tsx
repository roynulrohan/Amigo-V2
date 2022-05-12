import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GET_ALL_CONVERSATIONS } from '../graphql/queries';
import { CONVERSATIONS, CONVERSATION_COUNT } from '../redux/constants';
import { AuthReducer, Conversation, GeneralReducer } from '../types';
import { RecentCard } from './RecentCard';

interface Props {
    dispatch: Dispatch;
}
export const ConversationsPanel = ({ dispatch }: Props) => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const onlineUsers = useSelector((state: GeneralReducer) => state.general.onlineUsers);
    const conversations = useSelector((state: GeneralReducer) => state.general.conversations);

    return (
        <div className='px-2 py-4'>
            {conversations.length > 0 ? (
                [...conversations]
                    .sort((a, b) => b.updatedAt - a.updatedAt)
                    .map((conversation: Conversation) => {
                        const copy = { ...conversation };
                        copy['participants'] = [...conversation.participants.filter((participant) => participant !== auth.user.username)];

                        const isOnline = onlineUsers.find((o) => o.id === copy['participants'][0]);

                        return <RecentCard key={conversation._id} conversation={copy} status={isOnline ? isOnline.status : 'offline'} dispatch={dispatch} />;
                    })
            ) : (
                <div className='text-center'>
                    <h5 className='text-gray-400 text-sm'>
                        No conversations yet...
                        <br />
                        Add a contact to get started :)
                    </h5>
                </div>
            )}
        </div>
    );
};
