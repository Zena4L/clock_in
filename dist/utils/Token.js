"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class Token {
    constructor(user, res, statusCode) {
        this.user = user;
        this.res = res;
        this.statusCode = statusCode;
    }
    signToken(user) {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_EXPIRES
        });
    }
    createToken() {
        const token = this.signToken(this.user._id);
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: 'http://localhost:3000/',
            path: '/',
        };
        this.res.cookie('token', token, cookieOptions);
        this.res.status(200).json({
            status: 'ok',
            message: 'Token sent',
            token,
            data: {
                visitor: this.user
            }
        });
    }
}
exports.default = Token;
//# sourceMappingURL=Token.js.map