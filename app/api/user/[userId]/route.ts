import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connection";
import User from "@/models/user/user.model";
import Order from "@/models/order/order.model";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = await params;

    await connectToDatabase();

    const user = await User.findById(userId, { password: 0 }); // Exclude passwords for security
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await Order.find({ 'user.id': userId })
      .sort({ createdAt: -1 })
      .select('orderToken totalAmount status createdAt items');

    return NextResponse.json({user, orders});
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = await params;
    const updates = await req.json();

    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = await params;

    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
