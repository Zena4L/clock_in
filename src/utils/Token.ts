import * as jwt from 'jsonwebtoken';
import { IClock } from '../model/clockInModel';
import { Response, CookieOptions } from 'express';

class Token {
    user: IClock;
    res : Response;
    statusCode: number;
    constructor(user:IClock,res:Response,statusCode:number){
        this.user = user;
        this.res = res;
        this.statusCode = statusCode;
    }

    private signToken(user:IClock):string {
        return jwt.sign({id: user._id},process.env.JWT_SECRET || '',{
            expiresIn: process.env.JWT_EXPIRES
        })
    }

    createToken():void {
        const token = this.signToken(this.user._id);
        const cookieOptions: CookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: 'http://localhost:3000/',
            path: '/',
          };
        this.res.cookie('token',token,cookieOptions);
        this.res.status(200).json({
            status:'ok',
            message:'Token sent',
            token,
            data:{
                visitor: this.user
            }
        })
    }
}

export default Token;