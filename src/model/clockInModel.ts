import { Schema, Document, model } from "mongoose";

export interface IClock extends Document {
    name: string;
    phone: string;
    purpose: string;
    clockInTime: Date;
    clockOutTime: Date | undefined; 
  }
  
const clockSchema = new Schema<IClock>({
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
  }
});

export const ClockIn = model<IClock>('ClockIn', clockSchema);
