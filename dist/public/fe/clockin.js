"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const clockin = async (name, phone, purpose, status) => {
    try {
        const res = await axios_1.default.post('http://localhost:8000/api/clockin', {
            name,
            phone,
            purpose,
            status
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
        if (res.data.status === "ok") {
            (0, alert_1.showAlert)('success', 'You are clocked IN!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = clockin;
//# sourceMappingURL=clockin.js.map