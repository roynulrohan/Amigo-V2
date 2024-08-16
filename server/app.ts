import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import schema from './graphql/schema';

dotenv.config();

const app = express();
const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        return {
            req,
        };
    },
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

server.start().then(() => server.applyMiddleware({ app }));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oisbb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .catch((error) => {
        throw error;
    })
    .then(() => {
        console.log('Mongo connection established');
    });

const port = process.env.PORT || 4000;

const http = app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

const io = new Server(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const allClients = [];

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    const preferredStatus = socket.handshake.query.status;
    socket.join(id);

    if (preferredStatus !== 'invisible') {
        allClients.push({ id, status: preferredStatus });
    }

    io.emit('online-users', allClients);

    socket.on('send-message', ({ recipient, conversation }) => {
        socket.broadcast.to(recipient).emit('receive-message', {
            sender: id,
            conversation,
        });
    });

    socket.on('disconnect', () => {
        if (preferredStatus !== 'invisible') {
            const i = allClients.findIndex((x) => x.id === id);
            allClients.splice(i, 1);
        }
        io.emit('online-users', allClients);
    });
});
