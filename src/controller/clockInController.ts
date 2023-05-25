import {RequestHandler, Request, Response, CookieOptions, NextFunction} from 'express';
import { ClockIn , IClock} from "../model/clockInModel";
import asynAwait from "../utils/asynAwait";
import Token from "../utils/Token";
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {polygon,point,booleanPointInPolygon} from '@turf/turf';
import AppError from '../utils/AppError';

interface ReqBody {
    name:string;
    phone:string;
    purpose:string;
    status:string
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
    const {name, phone, purpose, status} = req.body as ReqBody;
    const visitor = await ClockIn.create({
        name,
        phone,
        purpose,
        status
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
   


export const queryByDate: RequestHandler = asynAwait(async (req, res, next) => {
    const { date, sortBy } = req.body;
  
    const startOfDay = moment(date).startOf('day').toDate();
    const endOfDay = moment(date).endOf('day').toDate();
  
    const query: any = {
      clockInTime: { $gte: startOfDay, $lte: endOfDay },
    };
  
    if (sortBy && ['Student', 'Staff', 'Visitor'].includes(sortBy)) {
      query['status'] = sortBy; 
    }
  
    const clockIns = await ClockIn.find(query).exec();
  
    res.status(200).json({
      status: 'ok',
      length: clockIns.length,
      data: {
        clockIns,
      },
    });
  });
  

export const getDocumentsByTimePeriod: RequestHandler = asynAwait(async (req, res, next) => {
    const { startDate, endDate } = req.body;
  
    const total =  await ClockIn.find();

    const result = await ClockIn.aggregate([
      {
        $match: {
          clockInTime: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
  
    const aggregatedData = result.map((item) => ({
      status: item._id,
      count: item.count,
    }));
  
    res.status(200).json({
      status: "ok",
      message: "Total clockings and aggregate by status",
      totalClockIn: total.length,
      data: aggregatedData,
    });
  });
  
  

export const geofence: RequestHandler = (req, res, next: NextFunction) => {
    const geofence = polygon([
      [
        [5.299265785198542, -2.0019658782824266],
        [5.299365621152669, -2.001828372676333],
        [5.299108900095178, -2.001639302467955],
        [5.299013818194961, -2.0017787178741324],
        [5.299265785198542, -2.0019658782824266]
      ]
    ]);
  
    const latlng = req.query as unknown as { lat: string; lng: string };
    const { lat, lng } = latlng;
  
    const pointToCheck = point([parseFloat(lat), parseFloat(lng)]);
    const isInside = booleanPointInPolygon(pointToCheck, geofence);

    if(!isInside){
      return next(new AppError('You are out of range',400))

    }
    next(); 
  };



  