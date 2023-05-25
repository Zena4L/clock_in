import { RequestHandler } from "express"
import { ClockIn } from "../model/clockInModel";
import asynAwait from "../utils/asynAwait";

export const home:RequestHandler = (req, res, next) => {
    res.status(200).render('clockin', {
      title: 'Welcome',
    });
}
