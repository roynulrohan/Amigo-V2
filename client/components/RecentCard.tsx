import { useLazyQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { GET_PHOTO } from '../graphql/queries';
import { CURRENT_CONVERSATION } from '../redux/constants';
import { Conversation } from '../types';
import { OnlineStatus } from './OnlineStatus';
import { motion } from 'framer-motion';

interface Props {
    conversation: Conversation;
    status: string;
    dispatch: Dispatch;
}

export const RecentCard = ({ conversation, status, dispatch }: Props) => {
    const [getPhoto, { data: photoData, loading: photoLoading }] = useLazyQuery(GET_PHOTO, { variables: { username: conversation.participants[0] } });

    useEffect(() => {
        getPhoto();
    }, [getPhoto]);

    return (
        <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
            onClick={() => {
                dispatch({ type: CURRENT_CONVERSATION, payload: conversation });
            }}
            className='bg-darkest flex items-center rounded-xl shadow-lg max-h-[80px] overflow-hidden cursor-pointer mb-3'>
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
                        {conversation.messages.at(-1)?.content}
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
        </motion.div>
    );
};
