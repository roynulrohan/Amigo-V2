import { merge } from 'lodash';
import { UserResolver } from './User';
import { GraphQLScalarType, Kind } from 'graphql';
import { ConversationResolver } from './Conversation';

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

export const resolvers = merge(UserResolver, ConversationResolver, { Date: dateScalar });
