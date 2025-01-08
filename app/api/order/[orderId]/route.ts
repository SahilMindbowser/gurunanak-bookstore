import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import Order from '@/models/order/order.model';

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
    await connectToDatabase();
    const order = await Order.findById(params.orderId).populate('userId', 'name email');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { orderId: string } }) {
  try {
    await connectToDatabase();
    const updates = await req.json();
    const {orderId} = await params
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  try {
    await connectToDatabase();
    const deletedOrder = await Order.findByIdAndDelete(params.orderId);

    if (!deletedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
