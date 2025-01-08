import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface IUserDetails {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  }

export interface IOrder extends Document {
    user: IUserDetails; 
  orderToken: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'COD' | 'Online';
  deliveryOption: 'pickup' | 'delivery';
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    orderToken: { type: String, required: true, unique: true },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    deliveryOption: { type: String, enum: ['pickup', 'delivery'], required: true },
    paymentMethod: { type: String, enum:['COD', 'Online'], required: true, default: 'Online' },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
