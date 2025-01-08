import mongoose, { Schema, Document, Model } from 'mongoose';
import { IOrder } from '../order/order.model';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string; 
  orders: IOrder[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    contact: { 
      type: String, 
      required: true, 
    },
    orders: [{ type: mongoose.Schema.Types.Mixed }],
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
