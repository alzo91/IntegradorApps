import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import routes from './routes';
import deviceRoutes from './deviceRoutes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: false, optionsSuccessStatus: 200 }));
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(deviceRoutes);
  }
}

export default new App().server;
