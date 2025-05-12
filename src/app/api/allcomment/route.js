import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Comment from "@/app/models/comment";

// GET: Fetch all comments
export async function GET(req) {
  await connectDB();

  try {
    console.log("Fetching all comments..."); // Log for debugging
    const comments = await Comment.find({});
    console.log(comments); // Log the comments for debugging

    if (comments.length === 0) {
      return NextResponse.json({ message: "No comments found" }, { status: 404 });
    }

    return NextResponse.json(comments, { status: 200 }); // Returning array directly
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch comments", error: err.message }, { status: 500 });
  }
}
// DELETE: Delete a comment by ID
export async function DELETE(req) {
  await connectDB();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Comment ID is required" }, { status: 400 });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    await Comment.findByIdAndDelete(id);

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete comment", error: err.message }, { status: 500 });
  }
}
