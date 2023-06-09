"use strict";
/**
 * @ description :  This is an operational error, the errors we create programatically
 *                  we make is as isOperation, to identify that it is programatic
 *                  status will be based on the status code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class OpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor());
    }
}
exports.default = OpError;
//# sourceMappingURL=AppError.js.map