import { makeExecutableSchema } from '@graphql-tools/schema';
import { UserTypeDef } from './User';
import { resolvers } from '../resolvers';
import { ConversationTypeDef } from './Conversation';

export default makeExecutableSchema({ typeDefs: [UserTypeDef, ConversationTypeDef], resolvers });
