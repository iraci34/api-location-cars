import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import path from "path";

class App {
  constructor() {
    this.server = express();

    mongoose.connect('...');

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    this.server.use(express.json());
  }

  routes() {  
    this.server.use(routes);
  }
}

export default new App().server;