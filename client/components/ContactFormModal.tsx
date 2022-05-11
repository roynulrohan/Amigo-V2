import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_CONTACT } from '../graphql/mutations';
import { UPDATE_CONTACTS } from '../redux/constants';

interface Props {
    hidden: boolean;
    close: Function;
}

export const ContactFormModal = ({ hidden, close }: Props) => {
    const dispatch = useDispatch();
    const [addContactMutation] = useMutation(ADD_CONTACT);
    const [contactInput, setContactInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        setContactInput('');
    }, [hidden]);

    const addContact = () => {
        setError('');

        if (contactInput === '') {
            setError('Please enter a username');
            return;
        }

        addContactMutation({ variables: { contact: contactInput } })
            .then(({ data }) => {
                console.log(data.addContact.updatedContacts);
                dispatch({ type: UPDATE_CONTACTS, payload: { newContacts: data?.addContact?.updatedContacts } });
                close();
            })
            .catch((err) => {
                setError(err?.message);
            });
    };

    return (
        <div
            className={
                'overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 fixed top-0 right-0 left-0 z-50 w-full md:inset-0 flex justify-center items-center md:h-full ' +
                (hidden ? 'hidden' : 'block')
            }>
            <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className='relative rounded-lg shadow bg-dark'>
                    <button
                        type='button'
                        className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                        onClick={() => {
                            close();
                        }}>
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fillRule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clipRule='evenodd'></path>
                        </svg>
                    </button>
                    <div className='py-6 px-6 lg:px-8'>
                        <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Add new contact</h3>
                        <div className='space-y-6'>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    Username
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    id='username'
                                    value={contactInput}
                                    onChange={(e) => {
                                        setContactInput(e.target.value);
                                    }}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                    placeholder='John123'
                                />
                            </div>
                            {error && (
                                <div className='flex justify-center'>
                                    <p className='text-xs text-red-500'>{error}</p>
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    addContact();
                                }}
                                className='w-full text-white text-lg font-bold bg-rose-500 hover:bg-rose-600 focus:ring-2 focus:outline-none focus:ring-rose-300 rounded-lg px-5 py-2 text-center'>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
