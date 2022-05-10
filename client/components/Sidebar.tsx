import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AuthReducer } from '../types';
import { ConversationsPanel } from './ConversationsPanel';

export const Sidebar = () => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);

    return (
        <div className='bg-dark-accent text-white min-w-[400px] max-w-[400px] h-screen flex flex-col'>
            <div className='h-[75px] flex justify-center items-center p-3 select-none'>
                <h1 className='text-pink-600 app-title text-3xl'>Amigo V2</h1>
            </div>
            <Tab.Group>
                <Tab.List className='w-full flex justify-evenly'>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    'w-1/3 rounded flex justify-center items-center p-2 outline-none transition-colors ' +
                                    (selected ? 'bg-fuchsia-600 text-white' : 'bg-darkest text-gray-400')
                                }>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='1.3em'
                                    height='1.3em'
                                    fill='currentColor'
                                    className='bi bi-chat-fill mr-2'
                                    viewBox='0 0 16 16'>
                                    <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z' />
                                </svg>
                                <p>Chat</p>
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    'w-1/3 rounded flex justify-center items-center p-2 outline-none transition-colors ' +
                                    (selected ? 'bg-amber-500 text-white' : 'bg-darkest text-gray-400')
                                }>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='1.4em'
                                    height='1.4em'
                                    fill='currentColor'
                                    className='bi bi-person-circle mr-2'
                                    viewBox='0 0 16 16'>
                                    <path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z' />
                                    <path fillRule='evenodd' d='M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                                    <path fillRule='evenodd' d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z' />
                                </svg>
                                <p>Contacts</p>
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    'w-1/3 rounded flex justify-center items-center p-2 outline-none transition-colors ' +
                                    (selected ? 'bg-green-500 text-white' : 'bg-darkest text-gray-400')
                                }>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='1.4em'
                                    height='1.4em'
                                    fill='currentColor'
                                    className='bi bi-person-lines-fill mr-2'
                                    viewBox='0 0 16 16'>
                                    <path
                                        fillRule='evenodd'
                                        d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z'
                                    />
                                </svg>
                                <p>Profile</p>
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className='flex-grow overflow-auto max-h-screen custom-scroll'>
                    <Tab.Panel>
                        <ConversationsPanel />
                    </Tab.Panel>
                    <Tab.Panel>Contacts</Tab.Panel>
                    <Tab.Panel>Profile</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <div className='min-h-[60px] target:h-[60px] w-[400px] bg-darkest flex items-center px-10'>
                <div className='relative w-[45px] h-[45px]'>
                    <img src={auth.user.photoURL ? auth.user.photoURL : '/images/cat.png'} alt='' className='w-full h-full object-cover rounded-full' />
                </div>

                <p className='ml-3 text-xl font-bold app-font'>{auth.user.username}</p>
            </div>
        </div>
    );
};
