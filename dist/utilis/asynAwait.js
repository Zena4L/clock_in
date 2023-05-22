"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param fn : a function(req,res,next)
 * @returns : a promise
 * description: This accepts a function (req,res,next) and then return the functionn (req,res,next) with catch(next).
 *              This is for handling async awaits.
 * @ usage example : asynAwait(async(req,res,next) =>{ })
 *
 */
const asynAwait = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
exports.default = asynAwait;
//# sourceMappingURL=asynAwait.js.map