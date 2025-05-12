import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user"; // Adjust path to your user model
import { NextResponse } from "next/server";

// GET: Fetch all users
export async function GET(req) {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(
      { message: "✅ Users fetched successfully", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json(
      { message: "❌ Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "❌ User ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "❌ User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json(
      { message: "❌ Server Error", error: error.message },
      { status: 500 }
    );
  }
}
