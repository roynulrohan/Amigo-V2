import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { MainApp } from '../components/MainApp';
import { SocketProvider, useSocket } from '../contexts/SocketProvider';
import { AuthReducer } from '../types';

const Home: NextPage = () => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);
    const preferredStatus = useSelector((state: AuthReducer) => state.auth.preferredStatus);

    return auth?.user && auth.user.username && preferredStatus ? (
        <SocketProvider id={auth.user.username} status={preferredStatus}>
            <MainApp />
        </SocketProvider>
    ) : (
        <div className='h-screen bg-zinc-900'>Unauthorized</div>
    );
};

export default Home;
