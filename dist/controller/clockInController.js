"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoc = exports.clockOut = exports.protect = exports.clockin = void 0;
const clockInModel_1 = require("../model/clockInModel");
const asynAwait_1 = __importDefault(require("../utils/asynAwait"));
const Token_1 = __importDefault(require("../utils/Token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
exports.clockin = (0, asynAwait_1.default)(async (req, res, next) => {
    const { name, phone, purpose } = req.body;
    const visitor = await clockInModel_1.ClockIn.create({
        name,
        phone,
        purpose
    });
    const token = new Token_1.default(visitor, res, 200);
    token.createToken();
});
exports.protect = (0, asynAwait_1.default)(async (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
    const currentVisitor = await clockInModel_1.ClockIn.findById(decoded.id);
    if (currentVisitor) {
        currentVisitor.clockOutTime = new Date() || undefined;
    }
    await (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.save());
    next();
});
const clockOut = (req, res) => {
    const cookieOptions = {
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
exports.clockOut = clockOut;
exports.getDoc = (0, asynAwait_1.default)(async (req, res, next) => {
    const { collectionName } = req.params;
    const clockInModel = (0, mongoose_1.model)(collectionName);
    // const result = await ClockIn.find();
    console.log(clockInModel);
    // res.status(200).json({
    //     status:'ok',
    //     data:{
    //         result
    //     }
    // })
    res.send('hello');
});
//# sourceMappingURL=clockInController.js.map