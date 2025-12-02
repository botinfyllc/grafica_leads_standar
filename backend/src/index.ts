import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import { public_router, protected_router } from './router';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', public_router);
app.use('/api', protected_router);

app
  .listen(config.PORT, () => {
    console.log('Server running at PORT: ', config.PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
