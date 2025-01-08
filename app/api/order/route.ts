import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import Order from '@/models/order/order.model';
import User from '@/models/user/user.model';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || '';

    const searchCriteria = query
      ? {
          $or: [
            { 'user.name': { $regex: query, $options: 'i' } },
            { orderToken: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const orders = await Order.find(searchCriteria);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      await connectToDatabase();
  
      const {
        userId,
        items,
        shippingAddress,
        paymentMethod,
        totalAmount,
        deliveryOption,
      } = await req.json();
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Prepare user details for embedding in the order
      const userDetails = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
  
      // Create the new order with embedded user details
      const newOrder = await Order.create({
        user: userDetails,
        orderToken: uuidv4(),
        items,
        totalAmount,
        shippingAddress: deliveryOption === 'delivery' ? shippingAddress : null,
        deliveryOption,
        paymentMethod,
        status: 'Pending',
      });
  
      // user.orders = user.orders || [];
      // user.orders.push(newOrder);
      // await user.save();
  
      return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
      console.error('Error creating order:', error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
  }
