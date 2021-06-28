import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import typeDefs from './graph/schema';
import resolvers from './graph/resolvers';
import models from './models';
import routes from './routes';

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { models }
});

const app = express();
server.applyMiddleware({ app, path: '/api/graph' });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use routers
app.use('/api/v1', routes);

app.get('*', (req, res) => res.status(404).json({
    errors: ['The endpoint you requested does not exist'],
    message: 'Check your endpoint url and try again!',
  }));

export default app;
