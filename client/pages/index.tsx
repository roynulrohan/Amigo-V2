import { useLazyQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainApp } from '../components/MainApp';
import { SocketProvider, useSocket } from '../contexts/SocketProvider';
import { GET_ALL_CONVERSATIONS } from '../graphql/queries';
import { CONVERSATIONS, CONVERSATION_COUNT } from '../redux/constants';
import { AuthReducer, GeneralReducer } from '../types';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const preferredStatus = useSelector((state: AuthReducer) => state.auth.preferredStatus);
    const general = useSelector((state: GeneralReducer) => state.general);
    const [getConversations, { data: conversationData, loading: conversationsLoading }] = useLazyQuery(GET_ALL_CONVERSATIONS);

    useEffect(() => {
        getConversations();
    }, [getConversations]);

    useEffect(() => {
        if (conversationData) {
            dispatch({ type: CONVERSATIONS, payload: conversationData.getAllConversations });
            dispatch({ type: CONVERSATION_COUNT, payload: conversationData.getAllConversations.length });
        }
    }, [conversationData, dispatch]);

    useEffect(() => {
        const localProfile = localStorage.getItem('profile');

        if (!localProfile) {
            router.push('/auth');
        }
    }, [auth?.user?.username, router]);

    return (
        <>
            <Head>
                <title>Amigo v2</title>
            </Head>
            {auth?.user && auth.user.username && general.onlineUsers && general.conversations && preferredStatus ? (
                <SocketProvider id={auth.user.username} status={preferredStatus}>
                    <MainApp />
                </SocketProvider>
            ) : (
                <div className='h-screen bg-dark'></div>
            )}
        </>
    );
};

export default Home;
