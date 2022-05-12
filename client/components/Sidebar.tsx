import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_CONVERSATION, UPDATE_PREFERREDSTATUS } from '../redux/constants';
import { AuthReducer } from '../types';
import { ContactsPanel } from './ContactsPanel';
import { ConversationsPanel } from './ConversationsPanel';
import { OnlineStatus } from './OnlineStatus';
import { ProfilePanel } from './ProfilePanel';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const preferredStatus = useSelector((state: AuthReducer) => state.auth.preferredStatus);
    const [tabIndex, setTabIndex] = useState<number>();
    const [statusDropdownHidden, setStatusDropdownHidden] = useState(true);

    useEffect(() => {
        const currentTab = JSON.parse(sessionStorage.getItem('currentSidebarTab') || '0') || 0;

        setTabIndex(currentTab);
    }, []);

    useEffect(() => {
        if (tabIndex !== undefined) {
            sessionStorage.setItem('currentSidebarTab', tabIndex.toString());
        }
    }, [tabIndex]);

    return (
        <div className='bg-dark-accent text-white min-w-[400px] max-w-[400px] h-screen flex flex-col'>
            <div className='h-[75px] flex justify-center items-center p-3 select-none '>
                <h1
                    onClick={() => {
                        dispatch({ type: CURRENT_CONVERSATION, payload: null });
                    }}
                    className='text-pink-600 app-title text-3xl cursor-pointer'>
                    Amigo V2
                </h1>
            </div>
            <Tab.Group
                selectedIndex={tabIndex}
                onChange={(index: number) => {
                    setTabIndex(index);
                }}>
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
                        <ConversationsPanel dispatch={dispatch} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ContactsPanel contacts={auth.user.contacts || []} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ProfilePanel user={auth.user} dispatch={dispatch} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <div className='relative min-h-[65px] target:h-[65px] w-[400px] bg-darkest flex items-center px-10'>
                <div className='relative w-[45px] h-[45px]'>
                    <img src={auth.user.photoURL ? auth.user.photoURL : '/images/cat.png'} alt='' className='w-full h-full object-cover rounded-full' />
                </div>
                <div className='ml-3 flex flex-col space-y-1 rlea'>
                    <p className='text-lg font-bold app-font'>{auth.user.username}</p>

                    <div className='relative flex flex-col items-center'>
                        <div hidden={statusDropdownHidden} className='z-10 absolute bottom-6 divide-y text-sm rounded-lg shadow w-44 bg-dark divide-gray-600'>
                            <div className='py-1'>
                                <button
                                    onClick={() => {
                                        dispatch({ type: UPDATE_PREFERREDSTATUS, payload: 'online' });
                                        setStatusDropdownHidden(true);
                                    }}
                                    className='px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2'>
                                    <span className='text-2xl text-green-400'>•</span> <span>Online</span>
                                </button>
                            </div>
                            <ul className='py-1 text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDividerButton'>
                                <li>
                                    <button
                                        onClick={() => {
                                            dispatch({ type: UPDATE_PREFERREDSTATUS, payload: 'away' });
                                            setStatusDropdownHidden(true);
                                        }}
                                        className='px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2'>
                                        <span className='text-2xl text-amber-500'>•</span> <span>Away</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            dispatch({ type: UPDATE_PREFERREDSTATUS, payload: 'dnd' });
                                            setStatusDropdownHidden(true);
                                        }}
                                        className='px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2'>
                                        <span className='text-2xl text-red-500'>•</span> <span>Do not Disturb</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            dispatch({ type: UPDATE_PREFERREDSTATUS, payload: 'invisible' });
                                            setStatusDropdownHidden(true);
                                        }}
                                        className='px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2'>
                                        <span className='text-2xl text-gray-300'>•</span> <span>Invisible</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div
                            className='cursor-pointer'
                            onClick={() => {
                                setStatusDropdownHidden((prevState) => !prevState);
                            }}>
                            <OnlineStatus status={preferredStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
