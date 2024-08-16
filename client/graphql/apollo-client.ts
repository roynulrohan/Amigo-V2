import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    const { token }: any = JSON.parse(localStorage.getItem('profile') || '{}');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
