import { useLazyQuery, useMutation } from '@apollo/client';
import Head from 'next/head';
import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocket } from '../contexts/SocketProvider';
import { SEND_MESSAGE as SEND_MESSAGE_MUTATION } from '../graphql/mutations';
import { GET_PHOTO } from '../graphql/queries';
import { SEND_MESSAGE } from '../redux/constants';
import { AuthReducer, GeneralReducer } from '../types';
import { OnlineStatus } from './OnlineStatus';

const daysBetween = function (startDate: Date, endDate: Date) {
    return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (24 * 60 * 60 * 1000)));
};

const getMessagePhoto = (isSender: boolean, defaultImg: string, senderImg?: string, recipientImg?: string) => {
    if (isSender) {
        return senderImg ? senderImg : defaultImg;
    }

    return recipientImg ? recipientImg : defaultImg;
};

export const Chat = () => {
    const dispatch = useDispatch();
    const socket: Socket | undefined = useSocket();
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const conversationCount = useSelector((state: GeneralReducer) => state.general.conversationCount);
    const currentConversation = useSelector((state: GeneralReducer) => state.general.currentConversation);
    const onlineUsers = useSelector((state: GeneralReducer) => state.general.onlineUsers);
    const [recipient, setRecipient] = useState('');
    const [inputText, setInputText] = useState('');
    const [sendDisabled, setSendDisabled] = useState(false);
    const [getPhoto, { data: photoData, loading: photoLoading }] = useLazyQuery(GET_PHOTO);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);
    const messagesEndRef = useRef<any>(null);

    useEffect(() => {}, [currentConversation]);

    useEffect(() => {
        if (recipient) {
            getPhoto({ variables: { username: recipient } });
        }
    }, [getPhoto, recipient]);

    useEffect(() => {
        scrollToBottom();
        if (auth.user && currentConversation) {
            setRecipient(currentConversation.participants.filter((participant) => participant !== auth.user.username)[0]);
        }
    }, [auth, currentConversation]);

    const scrollToBottom = () => {
        if (messagesEndRef.current?.scrollIntoView) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputText.trim()) {
            setSendDisabled(true);

            sendMessageMutation({ variables: { receiver: recipient, message: inputText } })
                .then(({ data }) => {
                    dispatch({ type: SEND_MESSAGE, payload: { conversation: data.sendMessage } });

                    socket?.emit('send-message', {
                        recipient,
                        conversation: data.sendMessage,
                    });

                    scrollToBottom();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setInputText('');
                    setTimeout(() => {
                        setSendDisabled(false);
                    }, 300);
                });
        }
    };

    return (
        <div className='flex-grow'>
            {currentConversation ? (
                <div className='bg-dark text-white h-screen flex flex-col'>
                    <Head>{recipient && <title>{recipient} | Amigo v2</title>}</Head>
                    <div className='h-[75px] flex justify-center items-center shadow-lg'>
                        <div className='flex items-center space-x-5 select-none bg-darkest p-3 px-10 rounded-full'>
                            <h5 className='font-bold text-2xl'>{recipient}</h5>
                            {onlineUsers && <OnlineStatus status={onlineUsers.find((o) => o.id === recipient)?.status || 'offline'} />}
                        </div>
                    </div>
                    <div className='flex-grow py-4 overflow-x-auto'>
                        {currentConversation.messages.map((message, index) => {
                            let hideTitle = false;
                            let newDay = true;

                            if (currentConversation.messages[index - 1]) {
                                if (message.sender === currentConversation.messages[index - 1].sender) {
                                    hideTitle = true;
                                }

                                newDay = daysBetween(new Date(message.dateCreated), new Date(currentConversation.messages[index - 1].dateCreated)) > 0;
                            }

                            return (
                                <div key={message._id}>
                                    {newDay && (
                                        <div className='separator'>
                                            {new Date(message.dateCreated).getDate() === new Date().getDate()
                                                ? 'Today'
                                                : new Date(message.dateCreated).toLocaleString('en-US', {
                                                      weekday: 'long',
                                                      month: 'long',
                                                      day: '2-digit',
                                                      year: 'numeric',
                                                  })}
                                        </div>
                                    )}
                                    <div
                                        className={
                                            'flex items-start rounded-lg mx-4 px-5 py-0.5 transition-all duration-[.15] ease-in-out relative hover:bg-darkest ' +
                                            (hideTitle ? 'py-0.5' : ' mt-4')
                                        }
                                        title={
                                            new Date(message.dateCreated).toLocaleString('en-US', {
                                                hour: 'numeric', // numeric, 2-digit
                                                minute: 'numeric', // numeric, 2-digit
                                            }) +
                                            ' - ' +
                                            new Date(message.dateCreated).toLocaleString('en-US', {
                                                day: '2-digit', // numeric, 2-digit
                                                year: 'numeric', // numeric, 2-digit
                                                month: 'long', // numeric, 2-digit
                                            })
                                        }>
                                        {hideTitle ? (
                                            <> </>
                                        ) : (
                                            <div className='absolute w-[45px] h-[45px]'>
                                                {photoData && !photoLoading && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        className='w-full h-full object-cover rounded-full'
                                                        src={getMessagePhoto(
                                                            auth.user.username === message.sender,
                                                            '/images/cat.png',
                                                            auth.user.photoURL,
                                                            photoData.getPhoto
                                                        )}
                                                        alt=''
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <div className='flex flex-col ml-16'>
                                            {hideTitle ? (
                                                <> </>
                                            ) : (
                                                <small className='m-0'>
                                                    <span className={auth.user.username === message.sender ? 'text-pink-600' : 'text-cyan-400'}>
                                                        {message.sender}
                                                    </span>
                                                    <span className='text-[12px] text-gray-400'>
                                                        {' - ' +
                                                            new Date(message.dateCreated).toLocaleString('en-US', {
                                                                hour: 'numeric', // numeric, 2-digit
                                                                minute: 'numeric', // numeric, 2-digit
                                                            })}
                                                    </span>
                                                </small>
                                            )}
                                            <h5 className='m-0 text-base'>{message.content}</h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='min-h-[65px] h-[65px] bg-transparent flex items-center justify-center px-10 pb-3'>
                        <form className='relative h-full w-full lg:w-2/3 ' onSubmit={sendMessage}>
                            <button
                                disabled={sendDisabled || inputText.trim() === ''}
                                className='bg-pink-600 text absolute inset-y-0 right-0 p-2 px-4 m-2 rounded-full'
                                type='submit'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-send' viewBox='0 0 16 16'>
                                    <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
                                </svg>
                            </button>
                            <input
                                type='text'
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                }}
                                className='block p-3 pl-12 w-full h-full text-sm rounded-full bg-darkest placeholder-gray-400 text-white outline-none border border-gray-700 focus:ring-pink-600  focus:border-pink-600'
                                placeholder={'Message ' + recipient}
                            />
                        </form>
                    </div>
                </div>
            ) : (
                auth.user &&
                auth.user.contacts && (
                    <div className={'flex flex-col justify-center items-center h-screen '}>
                        <Head>{recipient && <title>Amigo v2</title>}</Head>
                        
                        <div className='text-center app-font'>
                            <h2 className='text-white text-3xl '>
                                Hello,
                                <span className='text-pink-600 app-title  ml-3'>{auth.user.username}</span>
                            </h2>
                            <h5 className='text-gray-500 mt-3 whitespace-pre text-xl'>
                                {conversationCount !== 0 ? (
                                    <span>
                                        {'You have ' +
                                            conversationCount +
                                            (conversationCount > 1
                                                ? ' active conversations.\nClick on one to chat!'
                                                : ' active conversation.\nClick on their card to chat!')}
                                    </span>
                                ) : auth.user.contacts.length !== 0 ? (
                                    <span>
                                        {'You have ' +
                                            auth.user.contacts.length +
                                            (auth.user.contacts.length > 1 ? ' contacts.\nClick on one to chat!' : ' contact.\nClick on their card to chat!')}
                                    </span>
                                ) : (
                                    <span>
                                        You have no contacts yet.
                                        <br />
                                        Head over to the contacts tab to create one!
                                    </span>
                                )}
                            </h5>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};
