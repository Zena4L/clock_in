import {Request,Response,NextFunction } from "express";

/**
 * 
 * @param fn : a function(req,res,next)
 * @returns : a promise 
 * description: This accepts a function (req,res,next) and then return the functionn (req,res,next) with catch(next).
 *              This is for handling async awaits.
 * @ usage example : asynAwait(async(req,res,next) =>{ })
 * 
 */


const asynAwait =(fn:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>(req:Request,res:Response,next:NextFunction)=>{
    fn(req,res,next).catch(next);
}

export default asynAwait;