import path from 'path';
import express, {json,urlencoded}  from 'express';
import morgan from 'morgan';
import clockRouter from './routes/clockInRoutes';
import viewRouter from './routes/viewRouter';
import OpError from './utils/AppError';
import globalError from './controller/errorController';
import cors from 'cors';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }



app.use(json());
app.use(urlencoded({ extended: true, limit: '10kb' }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);


app.use('/api',clockRouter);
app.use('/',viewRouter)

app.all('*',(req,res,next)=>{
    next(new OpError(`cannot find ${req.originalUrl}`,404));
})

app.use(globalError);
export default app;