import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connection";
import User from "@/models/user/user.model";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, contact, password, role = 'user' } = await req.json();

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, contact, password: hashedPassword, role });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email, contact:newUser.contact, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    console.log(email)

    let users;
    if (email) {
      users = await User.find(
        { email: { $regex: email, $options: "i" } },
        { password: 0 }
      );
    } else {
      users = await User.find({}, { password: 0 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}