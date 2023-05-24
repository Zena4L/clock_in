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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const clockInRoutes_1 = __importDefault(require("./routes/clockInRoutes"));
const viewRouter_1 = __importDefault(require("./routes/viewRouter"));
const AppError_1 = __importDefault(require("./utils/AppError"));
const errorController_1 = __importDefault(require("./controller/errorController"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '..', 'src', 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true, limit: '10kb' }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/api', clockInRoutes_1.default);
app.use('/', viewRouter_1.default);
app.all('*', (req, res, next) => {
    next(new AppError_1.default(`cannot find ${req.originalUrl}`, 404));
});
app.use(errorController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map