import NextAuth from "next-auth";
import { IOrder } from "./models/order/order.model";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      contact:string;
      orders: IOrder[]
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    contact:string;
    orders:  IOrder[]
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    contact:string;
    orders:  IOrder[]
  }
}
