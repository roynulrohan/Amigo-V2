import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { MainApp } from '../components/MainApp';
import { SocketProvider, useSocket } from '../contexts/SocketProvider';
import { AuthReducer } from '../types';

const Home: NextPage = () => {
    const auth = useSelector((state: AuthReducer) => state.auth.authData);

    return auth?.user ? (
        <SocketProvider id={auth.user._id}>
            <MainApp />
        </SocketProvider>
    ) : (
        <div className='h-screen bg-zinc-900'>Unauthorized</div>
    );
};

export default Home;
