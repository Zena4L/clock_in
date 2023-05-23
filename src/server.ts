import Server from './utils/server';
import * as dotenv from 'dotenv';
import {env} from 'node:process';

dotenv.config({path:'config.env'});

const port = Number(env.PORT);

const DB_URL = env.DB_URL && env.DB_PASS ? env.DB_URL.replace('<PASSWORD>', env.DB_PASS) : '';


const server = new Server(port,DB_URL);

server.start();