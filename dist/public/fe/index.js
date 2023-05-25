"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clockin_1 = __importDefault(require("./clockin"));
const clockinForm = document.querySelector('.clockin');
if (clockinForm) {
    clockinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const purpose = document.getElementById('purpose').value;
        const status = document.getElementById('status').value;
        console.log({ name, phone, purpose, status });
        (0, clockin_1.default)(name, phone, purpose, status);
    });
}
//# sourceMappingURL=index.js.map