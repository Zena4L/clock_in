import {RequestHandler, Request, Response, CookieOptions} from 'express';
import { ClockIn , IClock} from "../model/clockInModel";
import asynAwait from "../utils/asynAwait";
import Token from "../utils/Token";
import jwt from 'jsonwebtoken';
import { model } from 'mongoose';




interface ReqBody {
    name:string;
    phone:string;
    purpose:string;
}

interface decodedToken {
    id: string;
    iat: number;
    exp: number;
}
interface userRequest extends Request {
    visitor?: IClock;
}
interface userResponse extends Response {
    visitor?: IClock;
}
export const clockin = asynAwait(async(req,res,next) =>{
    const {name, phone, purpose} = req.body as ReqBody;
    const visitor = await ClockIn.create({
        name,
        phone,
        purpose
    })

    const token = new Token(visitor,res,200);
    token.createToken();
})
export const protect:RequestHandler = asynAwait(async (req:userRequest , res:userResponse , next)=>{
    let token = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.token){
        token = req.cookies.token;
    }
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as decodedToken
    const currentVisitor = await ClockIn.findById(decoded.id);

    if(currentVisitor){
        currentVisitor.clockOutTime = new Date() || undefined;
    }
    await currentVisitor?.save();
    next();
})
export const clockOut:RequestHandler = (req, res) => {
    const cookieOptions:CookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: 'http://localhost:3000/',
      path: '/',
    };
    res.cookie('jwt', 'logded out', cookieOptions);
    res.status(200).json({ status: 'success' });
};
   
export const getDoc:RequestHandler = asynAwait(async (req,res,next)=>{
    const {collectionName} = req.params;
    const clockInModel =  model(collectionName);

    // const result = await ClockIn.find();
    console.log(clockInModel)
    // res.status(200).json({
    //     status:'ok',
    //     data:{
    //         result
    //     }
    // })
    res.send('hello');

})