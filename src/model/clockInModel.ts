import { Schema, Document, model, Query } from "mongoose";

export interface IClock extends Document {
    name: string;
    phone: string;
    purpose: string;
    clockInTime: Date;
    clockOutTime: Date | undefined; 
    status:string;
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
  },
  status:{
    type:String,
    enum:['Student','Staff','Visitor'],
    required: [true,'U must enter status']
  }
});
clockSchema.pre<Query<IClock,IClock>>(/^find/, function (next) {
  this.select('-__v');
  // this.select('-_id')
  next();
});

export const ClockIn = model<IClock>('ClockIn', clockSchema);
