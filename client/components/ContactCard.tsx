import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { DELETE_CONTACT } from '../graphql/mutations';
import { GET_CONVERSATION, GET_PHOTO } from '../graphql/queries';
import { CURRENT_CONVERSATION, UPDATE_CONTACTS } from '../redux/constants';
import { OnlineStatus } from './OnlineStatus';

interface Props {
    contact: string;
    status: string;
    dispatch: Dispatch;
}

export const ContactCard = ({ contact, status, dispatch }: Props) => {
    const [deleteContactMutation] = useMutation(DELETE_CONTACT);
    const [getConversation, { data: conversation, loading: conversationLoading }] = useLazyQuery(GET_CONVERSATION, { variables: { receiver: contact } });
    const [getPhoto, { data: photoData, loading: photoLoading }] = useLazyQuery(GET_PHOTO, { variables: { username: contact } });
    const [dropdownHidden, setDropdownHidden] = useState(true);

    useEffect(() => {
        getPhoto();
    }, [getPhoto]);

    const deleteContact = () => {
        deleteContactMutation({ variables: { contact } })
            .then(({ data }) => {
                dispatch({ type: UPDATE_CONTACTS, payload: { newContacts: data?.deleteContact?.updatedContacts } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openConversation = () => {
        getConversation()
            .then(({ data }) => {
                dispatch({ type: CURRENT_CONVERSATION, payload: data?.getConversation });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='bg-darkest relative flex items-center rounded-xl shadow-lg max-h-[80px] overflow-hidden mb-3'>
            <div className='relative w-[80px] h-[80px]'>
                {!photoLoading && photoData && (
                    <img src={photoData.getPhoto ? photoData.getPhoto : '/images/cat.png'} alt='' className='w-full h-full object-cover rounded-l-xl' />
                )}
            </div>

            <div
                onClick={() => {
                    openConversation();
                }}
                className='flex-grow mx-4 flex justify-between h-[80px] cursor-pointer'>
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
            <div className='relative flex justify-center'>
                <div
                    hidden={dropdownHidden}
                    onClick={() => {
                        setDropdownHidden(true);
                    }}
                    className='fixed h-screen w-screen top-0 left-0 bg-transparent z-40'></div>
                <div hidden={dropdownHidden} className='z-50 mt-14 fixed divide-y divide-gray-100 rounded-lg w-44 bg-zinc-700 shadow-lg'>
                    <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefault'>
                        <li>
                            <button
                                onClick={() => {
                                    openConversation();
                                    setDropdownHidden(true);
                                }}
                                className='block text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-600 dark:hover:text-white'>
                                Message
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    deleteContact();
                                }}
                                className='block text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-600 text-red-500'>
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
                <div
                    onClick={() => {
                        setDropdownHidden((prevState) => !prevState);
                    }}
                    className='z-10 space-y-1 p-5 cursor-pointer'>
                    <div className='w-1 h-1 rounded-full bg-gray-500'></div>
                    <div className='w-1 h-1 rounded-full bg-gray-500'></div>
                    <div className='w-1 h-1 rounded-full bg-gray-500'></div>
                </div>
            </div>
        </div>
    );
};
