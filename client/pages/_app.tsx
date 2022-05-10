import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { store, wrapper } from '../redux/store';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { client } from '../graphql/apollo-client';
import { VERIFY_USER } from '../graphql/queries';
import { useEffect } from 'react';
import { AUTH } from '../redux/constants';

function MyApp({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();
    const [verifyUser, { data: userData, loading: userLoading }] = useLazyQuery(VERIFY_USER, { client });

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    useEffect(() => {
        if (userData && !userLoading) {
            dispatch({ type: AUTH, payload: userData?.getUser });
        }
    }, [userData, userLoading, dispatch]);

    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
