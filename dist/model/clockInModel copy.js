"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockIn = void 0;
const mongoose_1 = require("mongoose");
const clockSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    purpose: {
        type: String,
        required: [true, 'Purpose is required']
    },
    clockInTime: {
        type: Date,
        default: Date.now
    },
    clockOutTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Student', 'Staff', 'Visitor'],
        required: [true, 'U must enter status']
    }
});
clockSchema.pre(/^find/, function (next) {
    this.select('-__v');
    // this.select('-_id')
    next();
});
exports.ClockIn = (0, mongoose_1.model)('ClockIn', clockSchema);
//# sourceMappingURL=clockInModel%20copy.js.map