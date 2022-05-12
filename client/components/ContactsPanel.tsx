import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralReducer } from '../types';
import { ContactCard } from './ContactCard';
import { ContactFormModal } from './ContactFormModal';

interface Props {
    contacts: string[];
}

export const ContactsPanel = ({ contacts }: Props) => {
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state: GeneralReducer) => state.general.onlineUsers);
    const [contactModalHidden, setContactModalHidden] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className='px-2 py-4'>
            <ContactFormModal
                hidden={contactModalHidden}
                close={() => {
                    setContactModalHidden(true);
                }}
            />
            <div className='flex items-center justify-between mb-4 '>
                <div className='flex-grow'>
                    <label htmlFor='default-search' className='text-sm font-medium sr-only text-gray-300'>
                        Search
                    </label>
                    <div className='relative'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                            </svg>
                        </div>
                        <input
                            type='search'
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            className='block p-3 pl-12 w-full text-sm rounded-lg bg-darkest placeholder-gray-400 text-white outline-none border border-gray-600 focus:ring-fuchsia-600  focus:border-fuchsia-600'
                            placeholder='Search your contacts'
                        />
                    </div>
                </div>
                <button
                    className='bg-rose-500 text p-3 ml-4 rounded-lg focus:outline focus:outline-1 focus:outline-white'
                    onClick={() => {
                        setContactModalHidden(false);
                    }}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='bi bi-person-plus-fill' viewBox='0 0 16 16'>
                        <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                        <path
                            fillRule='evenodd'
                            d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                        />
                    </svg>
                </button>
            </div>
            <div>
                {contacts.length !== 0 ? (
                    contacts.map((contact) => {
                        const isOnline = onlineUsers.find((o) => o.id === contact);

                        if (searchInput === '' || contact.toLowerCase().search(searchInput.toLowerCase()) >= 0) {
                            return <ContactCard key={contact} contact={contact} status={isOnline ? isOnline.status : 'offline'} dispatch={dispatch} />;
                        }
                    })
                ) : (
                    <div className='flex justify-center'>
                        <p className='text-gray-400 text-sm'>No contacts :(</p>
                    </div>
                )}
            </div>
        </div>
    );
};
