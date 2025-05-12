import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

// GET: Fetch all registered users
export async function GET() {
  await connectDB();

  try {
    const users = await User.find({}, '_id name email createdAt').sort({ createdAt: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch users", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a user by ID
export async function DELETE(req) {
  await connectDB();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete user", error: err.message },
      { status: 500 }
    );
  }
}
