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
const server_1 = __importDefault(require("./utils/server"));
const dotenv = __importStar(require("dotenv"));
const node_process_1 = require("node:process");
const clockInModel_1 = require("./model/clockInModel");
dotenv.config({ path: 'config.env' });
const port = Number(node_process_1.env.PORT);
const DB_URL = node_process_1.env.DB_URL && node_process_1.env.DB_PASS ? node_process_1.env.DB_URL.replace('<PASSWORD>', node_process_1.env.DB_PASS) : '';
const server = new server_1.default(port, DB_URL);
const deleteDB = async () => {
    await clockInModel_1.ClockIn.deleteMany();
    console.log('DB deleted');
    process.exit();
};
if (process.argv[2] === '--delete') {
    deleteDB();
}
server.start();
//# sourceMappingURL=mongoScript.js.map