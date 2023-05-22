import express, {json}  from 'express';
import morgan from 'morgan';
import clockRouter from './routes/clockInRoutes';
import OpError from './utils/AppError';
import globalError from './controller/errorController';

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }


app.use(json());
app.use('/',clockRouter);

app.all('*',(req,res,next)=>{
    next(new OpError(`cannot find ${req.originalUrl}`,404));
})

app.use(globalError);
export default app;