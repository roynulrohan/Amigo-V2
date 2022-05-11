import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_PHOTO } from '../graphql/queries';
import { OnlineStatus } from './OnlineStatus';

interface Props {
    contact: string;
    status: string;
}

export const ContactCard = ({ contact, status }: Props) => {
    const [getPhoto, { data: photoData, loading: photoLoading }] = useLazyQuery(GET_PHOTO, { variables: { username: contact } });

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
                <div className='flex flex-col space-y-2 pt-2'>
                    <p className='text-lg text-cyan-400 font-bold'>{contact}</p>
                    <div>
                        <OnlineStatus status={status} />
                    </div>
                </div>
                <div className='flex flex-col items-end justify-center'>
                    <p className='text-xs text-gray-500'></p>
                    <p className='text-xs text-gray-500'></p>
                </div>
            </div>
        </div>
    );
};
