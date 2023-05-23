import path from 'path';
import express, {json}  from 'express';
import morgan from 'morgan';
import clockRouter from './routes/clockInRoutes';
// import viewRouter from './routes/viewRoutes'
import OpError from './utils/AppError';
import globalError from './controller/errorController';

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }



app.use(json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

app.use('/api',clockRouter);
// app.use('/',viewRouter)

app.all('*',(req,res,next)=>{
    next(new OpError(`cannot find ${req.originalUrl}`,404));
})

app.use(globalError);
export default app;