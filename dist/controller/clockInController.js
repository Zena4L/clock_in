"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geofence = exports.getDocumentsByTimePeriod = exports.queryByDate = exports.clockOut = exports.protect = exports.clockin = void 0;
const clockInModel_1 = require("../model/clockInModel");
const asynAwait_1 = __importDefault(require("../utils/asynAwait"));
const Token_1 = __importDefault(require("../utils/Token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const turf_1 = require("@turf/turf");
const AppError_1 = __importDefault(require("../utils/AppError"));
exports.clockin = (0, asynAwait_1.default)(async (req, res, next) => {
    const { name, phone, purpose, status } = req.body;
    const visitor = await clockInModel_1.ClockIn.create({
        name,
        phone,
        purpose,
        status
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
exports.queryByDate = (0, asynAwait_1.default)(async (req, res, next) => {
    const { date, sortBy } = req.body;
    const startOfDay = (0, moment_1.default)(date).startOf('day').toDate();
    const endOfDay = (0, moment_1.default)(date).endOf('day').toDate();
    const query = {
        clockInTime: { $gte: startOfDay, $lte: endOfDay },
    };
    if (sortBy && ['Student', 'Staff', 'Visitor'].includes(sortBy)) {
        query['status'] = sortBy;
    }
    const clockIns = await clockInModel_1.ClockIn.find(query).exec();
    res.status(200).json({
        status: 'ok',
        length: clockIns.length,
        data: {
            clockIns,
        },
    });
});
exports.getDocumentsByTimePeriod = (0, asynAwait_1.default)(async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const total = await clockInModel_1.ClockIn.find();
    const result = await clockInModel_1.ClockIn.aggregate([
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
const geofence = (req, res, next) => {
    const geofence = (0, turf_1.polygon)([
        [
            [5.299265785198542, -2.0019658782824266],
            [5.299365621152669, -2.001828372676333],
            [5.299108900095178, -2.001639302467955],
            [5.299013818194961, -2.0017787178741324],
            [5.299265785198542, -2.0019658782824266]
        ]
    ]);
    const latlng = req.query;
    const { lat, lng } = latlng;
    const pointToCheck = (0, turf_1.point)([parseFloat(lat), parseFloat(lng)]);
    const isInside = (0, turf_1.booleanPointInPolygon)(pointToCheck, geofence);
    if (!isInside) {
        return next(new AppError_1.default('You are out of range', 400));
    }
    next();
};
exports.geofence = geofence;
//# sourceMappingURL=clockInController.js.map