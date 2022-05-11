import { useLazyQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { GET_PHOTO } from '../graphql/queries';
import { Conversation } from '../types';
import { OnlineStatus } from './OnlineStatus';

interface Props {
    conversation: Conversation;
    status: string;
}

export const RecentCard = ({ conversation, status }: Props) => {
    const [getPhoto, { data: photoData, loading: photoLoading }] = useLazyQuery(GET_PHOTO, { variables: { username: conversation.participants[0] } });

    useEffect(() => {
        getPhoto();
    }, [getPhoto]);

    return (
        <div className='bg-darkest flex items-center rounded-xl max-h-[80px] overflow-hidden mb-3'>
            <div className='relative w-[80px] h-[80px]'>
                {!photoLoading && photoData && (
                    <img src={photoData.getPhoto ? photoData.getPhoto : '/images/cat.png'} alt='' className='w-full h-full object-cover rounded-l-xl' />
                )}
            </div>

            <div className='flex-grow px-4 flex justify-between h-[80px]'>
                <div className='flex flex-col space-y-1 pt-2'>
                    <div className='flex space-x-3 items-center'>
                        <p className='text-lg text-cyan-400 font-bold'>{conversation.participants}</p>
                        <OnlineStatus status={status} />
                    </div>
                    <p className='text-xs text-gray-300 font-bold max-w-[200px] max-h-[30px] overflow-hidden text-ellipsis max-2-lines'>
                        {conversation.messages[0].content}
                    </p>
                </div>
                <div className='flex flex-col items-end justify-center'>
                    <p className='text-xs text-gray-500'>
                        {new Date(conversation.updatedAt).toLocaleString('en-US', {
                            hour: 'numeric', // numeric, 2-digit
                            minute: 'numeric', // numeric, 2-digit
                        })}
                    </p>
                    <p className='text-xs text-gray-500'>
                        {new Date(conversation.updatedAt).toLocaleString('en-US', {
                            day: 'numeric', // numeric, 2-digit
                            year: 'numeric', // numeric, 2-digit
                            month: 'numeric', // numeric, 2-digit
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
