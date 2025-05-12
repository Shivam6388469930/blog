// import { connectDB } from "@/app/lib/db";
// import Article from "@/app/models/article";
// import { NextResponse } from "next/server";

// // GET: Retrieve articles by userEmail (with optional pagination)

// export async function GET(req) {
//   try {
//     await connectDB();

//     const articles = await Article.find({ });

//     return NextResponse.json(
//       {
//         message: "✅ Articles fetched successfully",
//         articles,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("GET ARTICLES ERROR:", error);
//     return NextResponse.json(
//       { message: "❌ Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { connectDB } from "@/app/lib/db";
import Article from "@/app/models/article";
import { NextResponse } from "next/server";

// GET: Fetch all articles
export async function GET(req) {
  try {
    await connectDB();

    const articles = await Article.find({});
    return NextResponse.json(
      { message: "✅ Articles fetched successfully", articles },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ARTICLES ERROR:", error);
    return NextResponse.json(
      { message: "❌ Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete article by ID
export async function DELETE(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "❌ Article ID is required" },
        { status: 400 }
      );
    }

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json(
        { message: "❌ Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Article deleted successfully", deletedArticle },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ARTICLE ERROR:", error);
    return NextResponse.json(
      { message: "❌ Server Error", error: error.message },
      { status: 500 }
    );
  }
}
