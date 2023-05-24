import { RequestHandler } from "express"

export const home:RequestHandler = (req, res, next) => {
    res.status(200).render('clockin', {
      title: 'Welcome',
    });
  }