import app from './app';
import Server from './utilis/server';
import * as dotenv from 'dotenv';
import {env} from 'node:process';

dotenv.config({path:'config.env'});

const port = Number(env.PORT);
const DB_URL = env.DB_URL as string;

const server = new Server(port,DB_URL);

server.start();